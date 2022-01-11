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
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import Page from "./components/Page";
import TitleWrapper from "./components/TitleWrapper";
import ContentWrapper from "./components/ContentWrapper";
import { IOwnerToken, IContractInfo } from "./interfaces";
import "./App.css";
// import Web3 from "web3";
import { ethers } from "ethers";
import Meta from "antd/lib/card/Meta";
import { JsonRpcSigner } from "@ethersproject/providers";

const { Title, Text, Link } = Typography;

const App = () => {
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountAddress, setAccountAddress] = useState();
  // allow us to interact with our smart contract
  const [myTokens, setMyTokens] = useState<IOwnerToken[] | undefined>();
  // this is the value of the data variable in the smart contract
  const [contractData, setContractData] = useState<
    ethers.Contract | undefined
  >();
  const [contractInfo, setContractInfo] = useState<IContractInfo | undefined>();

  const creatorAddressLIMO = "0x79534DedaE71b7b672Fc997b4a77748AE5fdF5AD";
  const randomOwnerFromLIMO = "0x631e8b45bD1a8eD4564D40A80DF72d93fF5f11bd";
  const contractAddressLIMO = "0x0d464bdde2301c30871bb4c29bb7dd935f5a985c";
  const contractAddressAPES = "0x6afc012783e3a6ef8c5f05f8eee2edef6a052ec4";

  // const metadataUri = `https://ipfs.io/${tokenURI}`

  let minABI = [
    // name
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ name: "", type: "string" }],
      type: "function",
    },
    // symbol
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ name: "", type: "string" }],
      type: "function",
    },
    // totalSupply
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ name: "", type: "uint256" }],
      type: "function",
    },
    // balanceOf
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
    // tokenOfOwnerByIndex
    {
      constant: true,
      inputs: [
        { name: "_owner", type: "address" },
        { name: "_index", type: "uint256" },
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [{ name: "id", type: "uint256" }],
      type: "function",
    },
    // tokenURI
    {
      constant: true,
      inputs: [{ name: "_tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ name: "uri", type: "string" }],
      type: "function",
    },
  ];

  const toNumber = (num: ethers.BigNumber): number => {
    const bigNumber = ethers.BigNumber.from(num);
    return bigNumber.toNumber();
  };

  const getContractInfo = async (signer: JsonRpcSigner) => {
    // contract object instance with which we'll be able to interact with our smart contract in the blockchain. (smart contract address, abi, signer)
    const nftContract = new ethers.Contract(
      contractAddressLIMO,
      minABI,
      signer
    );

    setContractData(nftContract);
    console.log(contractData);

    const address = nftContract.address;
    const name = await nftContract.name();
    const symbol = await nftContract.symbol();
    const totalSupplyBN = await nftContract.totalSupply();
    const totalSupply = toNumber(totalSupplyBN._hex);
    const balanceBN = await nftContract.balanceOf(randomOwnerFromLIMO);
    const balance = toNumber(balanceBN._hex);
    const data: IContractInfo = { address, name, symbol, totalSupply, balance };
    setContractInfo(data);

    let ownerTokens = [];

    for (let i = 0; i < balance; i++) {
      const tokenId = await nftContract.tokenOfOwnerByIndex(
        // accountAddress,
        randomOwnerFromLIMO,
        ethers.BigNumber.from(i)
      );
      console.log(`tokenOfOwnerByIndex(): ${toNumber(tokenId._hex)}`);

      const tokenURI = await nftContract.tokenURI(
        ethers.BigNumber.from(tokenId._hex)
      );
      const fetchURI = tokenURI.substr(7);
      console.log(`fetchURI: ${fetchURI}`);

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
      } finally {
        setFetching(false);
      }
    }
    console.log(`ownerTokens`);
    console.log(ownerTokens);

    setMyTokens(ownerTokens);
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
      const signer = provider.getSigner();

      setLoading(true);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      setLoading(false);

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setAccountAddress(account);
        getContractInfo(signer);
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
    <Button type="primary" onClick={connectWalletHandler}>
      Connect Wallet
    </Button>
  );

  const WalletConnected = () => (
    <Space direction="vertical" align="center" size="middle">
      <Text>
        React website based on Ant Design for solving BlitzDev Challenge
      </Text>
      <Button type="primary" onClick={onClick}>
        Try Me
      </Button>
    </Space>
  );

  const Explore = () => (
    <>
      {/* <Title level={4}>Type some NFT Contract Address</Title> */}
      {contractInfo && (
        <Space
          direction="vertical"
          align="center"
          style={{ marginBottom: 24, overflowWrap: "anywhere" }}
        >
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
        </Space>
      )}
      <List
        dataSource={myTokens}
        grid={{ gutter: 20, column: 4 }}
        renderItem={({ image, tokenId }: IOwnerToken, index: number) => (
          <List.Item key={index}>
            <Skeleton loading={fetching} active>
              <Link
                href={`https://liquidcollectibles.io/collection/${contractInfo?.address}/token/${tokenId}`}
                target="_blank"
              >
                <Card
                  hoverable
                  cover={<img alt="example" src={image} />}
                  size="small"
                >
                  <Meta title={<Text strong>{`#${tokenId}`}</Text>} />
                </Card>
              </Link>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );

  const onClick = () => console.log("Clicked");

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
