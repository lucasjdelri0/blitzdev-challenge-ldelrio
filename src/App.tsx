import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Space,
  Spin,
  Avatar,
  List,
  Skeleton,
  Card,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ethers, Contract, BigNumber } from "ethers";
import Page from "./components/Page";
import TitleWrapper from "./components/TitleWrapper";
import ContentWrapper from "./components/ContentWrapper";
import InputSearch from "./components/InputSearch";
import { minABI } from "./utils";
import { IOwnerToken, IContractInfo } from "./types";
import "./App.css";

const { Title, Text, Link } = Typography;
const { Meta } = Card;

const App = () => {
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountAddress, setAccountAddress] = useState();
  const [web3Provider, setWeb3Provider] = useState<
    ethers.providers.Web3Provider | undefined
  >();
  const [contractInfo, setContractInfo] = useState<IContractInfo | undefined>();
  const [myTokens, setMyTokens] = useState<IOwnerToken[] | undefined>([]);

  const contractAddressLIMO = "0x0d464bdde2301c30871bb4c29bb7dd935f5a985c";
  const randomOwnerFromLIMO = "0x631e8b45bD1a8eD4564D40A80DF72d93fF5f11bd";

  const contractAddressAPES = "0x6afc012783e3a6ef8c5f05f8eee2edef6a052ec4";
  const randomOwnerFromAPES = "0x23aE81B92262B96e6fDe50B6616651Aa1e2ddD60";

  const toNumber = (num: BigNumber): number => {
    const bigNumber = BigNumber.from(num);
    return bigNumber.toNumber();
  };

  const getContractInfo = async (searchText: string) => {
    // contract object instance with which we'll be able to interact with our smart contract in the blockchain. (smart contract address, abi, signer)
    if (!web3Provider) {
      return;
    }

    setFetching(true);

    try {
      const signer = web3Provider.getSigner();
      const nftContract = new Contract(searchText, minABI, signer);

      const address = nftContract.address;
      const name = await nftContract.name();
      const symbol = await nftContract.symbol();
      const totalSupplyBN = await nftContract.totalSupply();
      const totalSupply = toNumber(totalSupplyBN._hex);
      // const balanceBN = await nftContract.balanceOf(accountAddress);
      const balanceBN = await nftContract.balanceOf(randomOwnerFromAPES);
      // const balanceBN = await nftContract.balanceOf(randomOwnerFromLIMO);
      const balance = toNumber(balanceBN._hex);

      const data: IContractInfo = {
        address,
        name,
        symbol,
        totalSupply,
        balance,
      };
      setContractInfo(data);

      let ownerTokens = [];
      for (let i = 0; i < balance; i++) {
        const tokenId = await nftContract.tokenOfOwnerByIndex(
          // accountAddress,
          // randomOwnerFromLIMO,
          randomOwnerFromAPES,
          BigNumber.from(i)
        );
        const tokenURI = await nftContract.tokenURI(tokenId);
        const fetchURI = tokenURI.substr(7);

        try {
          const result = await fetch(`https://ipfs.io/ipfs/${fetchURI}`, {
            method: "GET",
          });
          if (result.status !== 200) {
            const error = await result.text();
            throw new Error(error);
          }
          const { name, external_url, image, tokenId } = await result.json();
          const tokenInfo: IOwnerToken = { name, external_url, image, tokenId };
          ownerTokens.push(tokenInfo);
        } catch (e) {
          console.log(e);
          // Set onError and display toast
        }
      }
      setMyTokens(ownerTokens);
      setFetching(false);
    } catch (e) {
      setFetching(false);
    }
  };

  useEffect(() => {
    const checkWalletIsConnected = async () => {
      const { ethereum } = window as any;

      if (!ethereum) {
        console.log("Make sure you have Metamask installed!");
        return;
      }

      console.log("Wallet exists! We're ready to go!");
      const provider = new ethers.providers.Web3Provider(ethereum);
      setWeb3Provider(provider);

      setLoading(true);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      setLoading(false);

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setAccountAddress(account);
      } else {
        console.log("No authorized account found");
      }
    };

    checkWalletIsConnected();
  }, []);

  const connectWalletHandler = async () => {
    const { ethereum } = window as any;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account! Address: ", accounts[0]);
      setAccountAddress(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const ConnectWallet = () => (
    <Space
      direction="vertical"
      align="center"
      style={{ marginBottom: 24, overflowWrap: "anywhere" }}
    >
      <Title level={4}>We need to connect your wallet to continue</Title>
      <Button type="primary" onClick={connectWalletHandler}>
        Connect Wallet
      </Button>
    </Space>
  );

  const Explore = () => (
    <>
      <Title level={4}>Type some collection address</Title>
      <InputSearch
        loading={fetching}
        placeholder="Search collections by contract address"
        onSearch={getContractInfo}
      />
      {contractInfo && (
        <Space
          direction="vertical"
          align="center"
          style={{ marginBottom: 24, overflowWrap: "anywhere" }}
        >
          <Skeleton loading={fetching} active>
            <Avatar size={64}>{contractInfo.symbol}</Avatar>
            <Title level={4}>
              {contractInfo.name} {`(${contractInfo.symbol})`}
            </Title>

            <Link
              href={`https://bscscan.com/address/${contractInfo.address}`}
              target="_blank"
              copyable
            >
              {contractInfo.address}
            </Link>
          </Skeleton>
        </Space>
      )}
      <List
        dataSource={myTokens}
        grid={{ gutter: 20, column: 4 }}
        renderItem={({ name, image, tokenId }: IOwnerToken, index: number) => (
          <List.Item key={index}>
            <Skeleton loading={fetching} active>
              <Link
                href={`https://liquidcollectibles.io/collection/${contractInfo?.address}/token/${tokenId}`}
                target="_blank"
              >
                <Card
                  hoverable
                  cover={<img alt={name} src={image} />}
                  size="small"
                >
                  <Meta title={<Text strong>{name}</Text>} />
                </Card>
              </Link>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );

  return (
    <Page>
      <TitleWrapper>
        <Title level={2}>BlitzDev Challenge</Title>
      </TitleWrapper>
      <ContentWrapper>
        {!accountAddress ? (
          loading ? (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
            />
          ) : (
            <ConnectWallet />
          )
        ) : (
          <Explore />
        )}
      </ContentWrapper>
    </Page>
  );
};

export default App;
