export let minABI = [
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
