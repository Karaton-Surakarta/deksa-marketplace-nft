const myNFTAbi = [
  {
    "type": "constructor",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "tuple",
        "name": "_marketplaceV3Params",
        "components": [
          {
            "type": "tuple[]",
            "name": "extensions",
            "components": [
              {
                "type": "tuple",
                "name": "metadata",
                "components": [
                  {
                    "type": "string",
                    "name": "name"
                  },
                  {
                    "type": "string",
                    "name": "metadataURI"
                  },
                  {
                    "type": "address",
                    "name": "implementation"
                  }
                ]
              },
              {
                "type": "tuple[]",
                "name": "functions",
                "components": [
                  {
                    "type": "bytes4",
                    "name": "functionSelector"
                  },
                  {
                    "type": "string",
                    "name": "functionSignature"
                  }
                ]
              }
            ]
          },
          {
            "type": "address",
            "name": "royaltyEngineAddress"
          },
          {
            "type": "address",
            "name": "nativeTokenWrapper"
          }
        ]
      }
    ]
  },
  {
    "name": "InvalidCodeAtRange",
    "type": "error",
    "inputs": [
      {
        "type": "uint256",
        "name": "_size"
      },
      {
        "type": "uint256",
        "name": "_start"
      },
      {
        "type": "uint256",
        "name": "_end"
      }
    ]
  },
  {
    "name": "WriteError",
    "type": "error",
    "inputs": []
  },
  {
    "name": "ContractURIUpdated",
    "type": "event",
    "inputs": [
      {
        "type": "string",
        "name": "prevURI"
      },
      {
        "type": "string",
        "name": "newURI"
      }
    ]
  },
  {
    "name": "ExtensionAdded",
    "type": "event",
    "inputs": [
      {
        "type": "string",
        "name": "name",
        "indexed": true
      },
      {
        "type": "address",
        "name": "implementation",
        "indexed": true
      },
      {
        "type": "tuple",
        "name": "extension",
        "components": [
          {
            "type": "tuple",
            "name": "metadata",
            "components": [
              {
                "type": "string",
                "name": "name"
              },
              {
                "type": "string",
                "name": "metadataURI"
              },
              {
                "type": "address",
                "name": "implementation"
              }
            ]
          },
          {
            "type": "tuple[]",
            "name": "functions",
            "components": [
              {
                "type": "bytes4",
                "name": "functionSelector"
              },
              {
                "type": "string",
                "name": "functionSignature"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "ExtensionRemoved",
    "type": "event",
    "inputs": [
      {
        "type": "string",
        "name": "name",
        "indexed": true
      },
      {
        "type": "tuple",
        "name": "extension",
        "components": [
          {
            "type": "tuple",
            "name": "metadata",
            "components": [
              {
                "type": "string",
                "name": "name"
              },
              {
                "type": "string",
                "name": "metadataURI"
              },
              {
                "type": "address",
                "name": "implementation"
              }
            ]
          },
          {
            "type": "tuple[]",
            "name": "functions",
            "components": [
              {
                "type": "bytes4",
                "name": "functionSelector"
              },
              {
                "type": "string",
                "name": "functionSignature"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "ExtensionReplaced",
    "type": "event",
    "inputs": [
      {
        "type": "string",
        "name": "name",
        "indexed": true
      },
      {
        "type": "address",
        "name": "implementation",
        "indexed": true
      },
      {
        "type": "tuple",
        "name": "extension",
        "components": [
          {
            "type": "tuple",
            "name": "metadata",
            "components": [
              {
                "type": "string",
                "name": "name"
              },
              {
                "type": "string",
                "name": "metadataURI"
              },
              {
                "type": "address",
                "name": "implementation"
              }
            ]
          },
          {
            "type": "tuple[]",
            "name": "functions",
            "components": [
              {
                "type": "bytes4",
                "name": "functionSelector"
              },
              {
                "type": "string",
                "name": "functionSignature"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "FlatPlatformFeeUpdated",
    "type": "event",
    "inputs": [
      {
        "type": "address",
        "name": "platformFeeRecipient"
      },
      {
        "type": "uint256",
        "name": "flatFee"
      }
    ]
  },
  {
    "name": "FunctionDisabled",
    "type": "event",
    "inputs": [
      {
        "type": "string",
        "name": "name",
        "indexed": true
      },
      {
        "type": "bytes4",
        "name": "functionSelector",
        "indexed": true
      },
      {
        "type": "tuple",
        "name": "extMetadata",
        "components": [
          {
            "type": "string",
            "name": "name"
          },
          {
            "type": "string",
            "name": "metadataURI"
          },
          {
            "type": "address",
            "name": "implementation"
          }
        ]
      }
    ]
  },
  {
    "name": "FunctionEnabled",
    "type": "event",
    "inputs": [
      {
        "type": "string",
        "name": "name",
        "indexed": true
      },
      {
        "type": "bytes4",
        "name": "functionSelector",
        "indexed": true
      },
      {
        "type": "tuple",
        "name": "extFunction",
        "components": [
          {
            "type": "bytes4",
            "name": "functionSelector"
          },
          {
            "type": "string",
            "name": "functionSignature"
          }
        ]
      },
      {
        "type": "tuple",
        "name": "extMetadata",
        "components": [
          {
            "type": "string",
            "name": "name"
          },
          {
            "type": "string",
            "name": "metadataURI"
          },
          {
            "type": "address",
            "name": "implementation"
          }
        ]
      }
    ]
  },
  {
    "name": "Initialized",
    "type": "event",
    "inputs": [
      {
        "type": "uint8",
        "name": "version"
      }
    ]
  },
  {
    "name": "PlatformFeeInfoUpdated",
    "type": "event",
    "inputs": [
      {
        "type": "address",
        "name": "platformFeeRecipient",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "platformFeeBps"
      }
    ]
  },
  {
    "name": "PlatformFeeTypeUpdated",
    "type": "event",
    "inputs": [
      {
        "type": "uint8",
        "name": "feeType"
      }
    ]
  },
  {
    "name": "RoleAdminChanged",
    "type": "event",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role",
        "indexed": true
      },
      {
        "type": "bytes32",
        "name": "previousAdminRole",
        "indexed": true
      },
      {
        "type": "bytes32",
        "name": "newAdminRole",
        "indexed": true
      }
    ]
  },
  {
    "name": "RoleGranted",
    "type": "event",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role",
        "indexed": true
      },
      {
        "type": "address",
        "name": "account",
        "indexed": true
      },
      {
        "type": "address",
        "name": "sender",
        "indexed": true
      }
    ]
  },
  {
    "name": "RoleRevoked",
    "type": "event",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role",
        "indexed": true
      },
      {
        "type": "address",
        "name": "account",
        "indexed": true
      },
      {
        "type": "address",
        "name": "sender",
        "indexed": true
      }
    ]
  },
  {
    "name": "RoyaltyEngineUpdated",
    "type": "event",
    "inputs": [
      {
        "type": "address",
        "name": "previousAddress",
        "indexed": true
      },
      {
        "type": "address",
        "name": "newAddress",
        "indexed": true
      }
    ]
  },
  {
    "name": "DEFAULT_ADMIN_ROLE",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "type": "bytes32"
      }
    ]
  },
  {
    "name": "_disableFunctionInExtension",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "string",
        "name": "_extensionName"
      },
      {
        "type": "bytes4",
        "name": "_functionSelector"
      }
    ],
    "outputs": []
  },
  {
    "name": "addExtension",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "tuple",
        "name": "_extension",
        "components": [
          {
            "type": "tuple",
            "name": "metadata",
            "components": [
              {
                "type": "string",
                "name": "name"
              },
              {
                "type": "string",
                "name": "metadataURI"
              },
              {
                "type": "address",
                "name": "implementation"
              }
            ]
          },
          {
            "type": "tuple[]",
            "name": "functions",
            "components": [
              {
                "type": "bytes4",
                "name": "functionSelector"
              },
              {
                "type": "string",
                "name": "functionSignature"
              }
            ]
          }
        ]
      }
    ],
    "outputs": []
  },
  {
    "name": "contractType",
    "type": "function",
    "stateMutability": "pure",
    "inputs": [],
    "outputs": [
      {
        "type": "bytes32"
      }
    ]
  },
  {
    "name": "contractURI",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "type": "string"
      }
    ]
  },
  {
    "name": "contractVersion",
    "type": "function",
    "stateMutability": "pure",
    "inputs": [],
    "outputs": [
      {
        "type": "uint8"
      }
    ]
  },
  {
    "name": "defaultExtensions",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "type": "address"
      }
    ]
  },
  {
    "name": "disableFunctionInExtension",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "string",
        "name": "_extensionName"
      },
      {
        "type": "bytes4",
        "name": "_functionSelector"
      }
    ],
    "outputs": []
  },
  {
    "name": "enableFunctionInExtension",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "string",
        "name": "_extensionName"
      },
      {
        "type": "tuple",
        "name": "_function",
        "components": [
          {
            "type": "bytes4",
            "name": "functionSelector"
          },
          {
            "type": "string",
            "name": "functionSignature"
          }
        ]
      }
    ],
    "outputs": []
  },
  {
    "name": "getAllExtensions",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "allExtensions",
        "components": [
          {
            "type": "tuple",
            "name": "metadata",
            "components": [
              {
                "type": "string",
                "name": "name"
              },
              {
                "type": "string",
                "name": "metadataURI"
              },
              {
                "type": "address",
                "name": "implementation"
              }
            ]
          },
          {
            "type": "tuple[]",
            "name": "functions",
            "components": [
              {
                "type": "bytes4",
                "name": "functionSelector"
              },
              {
                "type": "string",
                "name": "functionSignature"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "getExtension",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "string",
        "name": "extensionName"
      }
    ],
    "outputs": [
      {
        "type": "tuple",
        "components": [
          {
            "type": "tuple",
            "name": "metadata",
            "components": [
              {
                "type": "string",
                "name": "name"
              },
              {
                "type": "string",
                "name": "metadataURI"
              },
              {
                "type": "address",
                "name": "implementation"
              }
            ]
          },
          {
            "type": "tuple[]",
            "name": "functions",
            "components": [
              {
                "type": "bytes4",
                "name": "functionSelector"
              },
              {
                "type": "string",
                "name": "functionSignature"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "getFlatPlatformFeeInfo",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "type": "address"
      },
      {
        "type": "uint256"
      }
    ]
  },
  {
    "name": "getImplementationForFunction",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "bytes4",
        "name": "_functionSelector"
      }
    ],
    "outputs": [
      {
        "type": "address"
      }
    ]
  },
  {
    "name": "getMetadataForFunction",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "bytes4",
        "name": "functionSelector"
      }
    ],
    "outputs": [
      {
        "type": "tuple",
        "components": [
          {
            "type": "string",
            "name": "name"
          },
          {
            "type": "string",
            "name": "metadataURI"
          },
          {
            "type": "address",
            "name": "implementation"
          }
        ]
      }
    ]
  },
  {
    "name": "getPlatformFeeInfo",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "type": "address"
      },
      {
        "type": "uint16"
      }
    ]
  },
  {
    "name": "getPlatformFeeType",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "type": "uint8"
      }
    ]
  },
  {
    "name": "getRoleAdmin",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role"
      }
    ],
    "outputs": [
      {
        "type": "bytes32"
      }
    ]
  },
  {
    "name": "getRoleMember",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role"
      },
      {
        "type": "uint256",
        "name": "index"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "member"
      }
    ]
  },
  {
    "name": "getRoleMemberCount",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "count"
      }
    ]
  },
  {
    "name": "getRoyalty",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "address",
        "name": "tokenAddress"
      },
      {
        "type": "uint256",
        "name": "tokenId"
      },
      {
        "type": "uint256",
        "name": "value"
      }
    ],
    "outputs": [
      {
        "type": "address[]",
        "name": "recipients"
      },
      {
        "type": "uint256[]",
        "name": "amounts"
      }
    ]
  },
  {
    "name": "getRoyaltyEngineAddress",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "royaltyEngineAddress"
      }
    ]
  },
  {
    "name": "grantRole",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role"
      },
      {
        "type": "address",
        "name": "account"
      }
    ],
    "outputs": []
  },
  {
    "name": "hasRole",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role"
      },
      {
        "type": "address",
        "name": "account"
      }
    ],
    "outputs": [
      {
        "type": "bool"
      }
    ]
  },
  {
    "name": "hasRoleWithSwitch",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role"
      },
      {
        "type": "address",
        "name": "account"
      }
    ],
    "outputs": [
      {
        "type": "bool"
      }
    ]
  },
  {
    "name": "initialize",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "address",
        "name": "_defaultAdmin"
      },
      {
        "type": "string",
        "name": "_contractURI"
      },
      {
        "type": "address[]",
        "name": "_trustedForwarders"
      },
      {
        "type": "address",
        "name": "_platformFeeRecipient"
      },
      {
        "type": "uint16",
        "name": "_platformFeeBps"
      }
    ],
    "outputs": []
  },
  {
    "name": "isTrustedForwarder",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "address",
        "name": "forwarder"
      }
    ],
    "outputs": [
      {
        "type": "bool"
      }
    ]
  },
  {
    "name": "multicall",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "bytes[]",
        "name": "data"
      }
    ],
    "outputs": [
      {
        "type": "bytes[]",
        "name": "results"
      }
    ]
  },
  {
    "name": "onERC1155BatchReceived",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "address"
      },
      {
        "type": "address"
      },
      {
        "type": "uint256[]"
      },
      {
        "type": "uint256[]"
      },
      {
        "type": "bytes"
      }
    ],
    "outputs": [
      {
        "type": "bytes4"
      }
    ]
  },
  {
    "name": "onERC1155Received",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "address"
      },
      {
        "type": "address"
      },
      {
        "type": "uint256"
      },
      {
        "type": "uint256"
      },
      {
        "type": "bytes"
      }
    ],
    "outputs": [
      {
        "type": "bytes4"
      }
    ]
  },
  {
    "name": "onERC721Received",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "address"
      },
      {
        "type": "address"
      },
      {
        "type": "uint256"
      },
      {
        "type": "bytes"
      }
    ],
    "outputs": [
      {
        "type": "bytes4"
      }
    ]
  },
  {
    "name": "removeExtension",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "string",
        "name": "_extensionName"
      }
    ],
    "outputs": []
  },
  {
    "name": "renounceRole",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role"
      },
      {
        "type": "address",
        "name": "account"
      }
    ],
    "outputs": []
  },
  {
    "name": "replaceExtension",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "tuple",
        "name": "_extension",
        "components": [
          {
            "type": "tuple",
            "name": "metadata",
            "components": [
              {
                "type": "string",
                "name": "name"
              },
              {
                "type": "string",
                "name": "metadataURI"
              },
              {
                "type": "address",
                "name": "implementation"
              }
            ]
          },
          {
            "type": "tuple[]",
            "name": "functions",
            "components": [
              {
                "type": "bytes4",
                "name": "functionSelector"
              },
              {
                "type": "string",
                "name": "functionSignature"
              }
            ]
          }
        ]
      }
    ],
    "outputs": []
  },
  {
    "name": "revokeRole",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role"
      },
      {
        "type": "address",
        "name": "account"
      }
    ],
    "outputs": []
  },
  {
    "name": "setContractURI",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "string",
        "name": "_uri"
      }
    ],
    "outputs": []
  },
  {
    "name": "setFlatPlatformFeeInfo",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "address",
        "name": "_platformFeeRecipient"
      },
      {
        "type": "uint256",
        "name": "_flatFee"
      }
    ],
    "outputs": []
  },
  {
    "name": "setPlatformFeeInfo",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "address",
        "name": "_platformFeeRecipient"
      },
      {
        "type": "uint256",
        "name": "_platformFeeBps"
      }
    ],
    "outputs": []
  },
  {
    "name": "setPlatformFeeType",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "uint8",
        "name": "_feeType"
      }
    ],
    "outputs": []
  },
  {
    "name": "setRoyaltyEngine",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "address",
        "name": "_royaltyEngineAddress"
      }
    ],
    "outputs": []
  },
  {
    "name": "supportsInterface",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "bytes4",
        "name": "interfaceId"
      }
    ],
    "outputs": [
      {
        "type": "bool"
      }
    ]
  },
  {
    "type": "receive",
    "stateMutability": "payable"
  },
  {
    "name": "BuyerApprovedForListing",
    "type": "event",
    "inputs": [
      {
        "type": "uint256",
        "name": "listingId",
        "indexed": true
      },
      {
        "type": "address",
        "name": "buyer",
        "indexed": true
      },
      {
        "type": "bool",
        "name": "approved"
      }
    ]
  },
  {
    "name": "CancelledListing",
    "type": "event",
    "inputs": [
      {
        "type": "address",
        "name": "listingCreator",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "listingId",
        "indexed": true
      }
    ]
  },
  {
    "name": "CurrencyApprovedForListing",
    "type": "event",
    "inputs": [
      {
        "type": "uint256",
        "name": "listingId",
        "indexed": true
      },
      {
        "type": "address",
        "name": "currency",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "pricePerToken"
      }
    ]
  },
  {
    "name": "NewListing",
    "type": "event",
    "inputs": [
      {
        "type": "address",
        "name": "listingCreator",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "listingId",
        "indexed": true
      },
      {
        "type": "address",
        "name": "assetContract",
        "indexed": true
      },
      {
        "type": "tuple",
        "name": "listing",
        "components": [
          {
            "type": "uint256",
            "name": "listingId"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "uint256",
            "name": "pricePerToken"
          },
          {
            "type": "uint128",
            "name": "startTimestamp"
          },
          {
            "type": "uint128",
            "name": "endTimestamp"
          },
          {
            "type": "address",
            "name": "listingCreator"
          },
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint8",
            "name": "tokenType"
          },
          {
            "type": "uint8",
            "name": "status"
          },
          {
            "type": "bool",
            "name": "reserved"
          }
        ]
      }
    ]
  },
  {
    "name": "NewSale",
    "type": "event",
    "inputs": [
      {
        "type": "address",
        "name": "listingCreator",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "listingId",
        "indexed": true
      },
      {
        "type": "address",
        "name": "assetContract",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "tokenId"
      },
      {
        "type": "address",
        "name": "buyer"
      },
      {
        "type": "uint256",
        "name": "quantityBought"
      },
      {
        "type": "uint256",
        "name": "totalPricePaid"
      }
    ]
  },
  {
    "name": "UpdatedListing",
    "type": "event",
    "inputs": [
      {
        "type": "address",
        "name": "listingCreator",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "listingId",
        "indexed": true
      },
      {
        "type": "address",
        "name": "assetContract",
        "indexed": true
      },
      {
        "type": "tuple",
        "name": "listing",
        "components": [
          {
            "type": "uint256",
            "name": "listingId"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "uint256",
            "name": "pricePerToken"
          },
          {
            "type": "uint128",
            "name": "startTimestamp"
          },
          {
            "type": "uint128",
            "name": "endTimestamp"
          },
          {
            "type": "address",
            "name": "listingCreator"
          },
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint8",
            "name": "tokenType"
          },
          {
            "type": "uint8",
            "name": "status"
          },
          {
            "type": "bool",
            "name": "reserved"
          }
        ]
      }
    ]
  },
  {
    "name": "_msgData",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "type": "bytes"
      }
    ]
  },
  {
    "name": "_msgSender",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "sender"
      }
    ]
  },
  {
    "name": "approveBuyerForListing",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "uint256",
        "name": "_listingId"
      },
      {
        "type": "address",
        "name": "_buyer"
      },
      {
        "type": "bool",
        "name": "_toApprove"
      }
    ],
    "outputs": []
  },
  {
    "name": "approveCurrencyForListing",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "uint256",
        "name": "_listingId"
      },
      {
        "type": "address",
        "name": "_currency"
      },
      {
        "type": "uint256",
        "name": "_pricePerTokenInCurrency"
      }
    ],
    "outputs": []
  },
  {
    "name": "buyFromListing",
    "type": "function",
    "stateMutability": "payable",
    "inputs": [
      {
        "type": "uint256",
        "name": "_listingId"
      },
      {
        "type": "address",
        "name": "_buyFor"
      },
      {
        "type": "uint256",
        "name": "_quantity"
      },
      {
        "type": "address",
        "name": "_currency"
      },
      {
        "type": "uint256",
        "name": "_expectedTotalPrice"
      }
    ],
    "outputs": []
  },
  {
    "name": "cancelListing",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "uint256",
        "name": "_listingId"
      }
    ],
    "outputs": []
  },
  {
    "name": "createListing",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "tuple",
        "name": "_params",
        "components": [
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint256",
            "name": "pricePerToken"
          },
          {
            "type": "uint128",
            "name": "startTimestamp"
          },
          {
            "type": "uint128",
            "name": "endTimestamp"
          },
          {
            "type": "bool",
            "name": "reserved"
          }
        ]
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "listingId"
      }
    ]
  },
  {
    "name": "currencyPriceForListing",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "uint256",
        "name": "_listingId"
      },
      {
        "type": "address",
        "name": "_currency"
      }
    ],
    "outputs": [
      {
        "type": "uint256"
      }
    ]
  },
  {
    "name": "getAllListings",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "uint256",
        "name": "_startId"
      },
      {
        "type": "uint256",
        "name": "_endId"
      }
    ],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "_allListings",
        "components": [
          {
            "type": "uint256",
            "name": "listingId"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "uint256",
            "name": "pricePerToken"
          },
          {
            "type": "uint128",
            "name": "startTimestamp"
          },
          {
            "type": "uint128",
            "name": "endTimestamp"
          },
          {
            "type": "address",
            "name": "listingCreator"
          },
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint8",
            "name": "tokenType"
          },
          {
            "type": "uint8",
            "name": "status"
          },
          {
            "type": "bool",
            "name": "reserved"
          }
        ]
      }
    ]
  },
  {
    "name": "getAllValidListings",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "uint256",
        "name": "_startId"
      },
      {
        "type": "uint256",
        "name": "_endId"
      }
    ],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "_validListings",
        "components": [
          {
            "type": "uint256",
            "name": "listingId"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "uint256",
            "name": "pricePerToken"
          },
          {
            "type": "uint128",
            "name": "startTimestamp"
          },
          {
            "type": "uint128",
            "name": "endTimestamp"
          },
          {
            "type": "address",
            "name": "listingCreator"
          },
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint8",
            "name": "tokenType"
          },
          {
            "type": "uint8",
            "name": "status"
          },
          {
            "type": "bool",
            "name": "reserved"
          }
        ]
      }
    ]
  },
  {
    "name": "getListing",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "uint256",
        "name": "_listingId"
      }
    ],
    "outputs": [
      {
        "type": "tuple",
        "name": "listing",
        "components": [
          {
            "type": "uint256",
            "name": "listingId"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "uint256",
            "name": "pricePerToken"
          },
          {
            "type": "uint128",
            "name": "startTimestamp"
          },
          {
            "type": "uint128",
            "name": "endTimestamp"
          },
          {
            "type": "address",
            "name": "listingCreator"
          },
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint8",
            "name": "tokenType"
          },
          {
            "type": "uint8",
            "name": "status"
          },
          {
            "type": "bool",
            "name": "reserved"
          }
        ]
      }
    ]
  },
  {
    "name": "isBuyerApprovedForListing",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "uint256",
        "name": "_listingId"
      },
      {
        "type": "address",
        "name": "_buyer"
      }
    ],
    "outputs": [
      {
        "type": "bool"
      }
    ]
  },
  {
    "name": "isCurrencyApprovedForListing",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "uint256",
        "name": "_listingId"
      },
      {
        "type": "address",
        "name": "_currency"
      }
    ],
    "outputs": [
      {
        "type": "bool"
      }
    ]
  },
  {
    "name": "totalListings",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256"
      }
    ]
  },
  {
    "name": "updateListing",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "uint256",
        "name": "_listingId"
      },
      {
        "type": "tuple",
        "name": "_params",
        "components": [
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint256",
            "name": "pricePerToken"
          },
          {
            "type": "uint128",
            "name": "startTimestamp"
          },
          {
            "type": "uint128",
            "name": "endTimestamp"
          },
          {
            "type": "bool",
            "name": "reserved"
          }
        ]
      }
    ],
    "outputs": []
  },
  {
    "name": "AuctionClosed",
    "type": "event",
    "inputs": [
      {
        "type": "uint256",
        "name": "auctionId",
        "indexed": true
      },
      {
        "type": "address",
        "name": "assetContract",
        "indexed": true
      },
      {
        "type": "address",
        "name": "closer",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "tokenId"
      },
      {
        "type": "address",
        "name": "auctionCreator"
      },
      {
        "type": "address",
        "name": "winningBidder"
      }
    ]
  },
  {
    "name": "CancelledAuction",
    "type": "event",
    "inputs": [
      {
        "type": "address",
        "name": "auctionCreator",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "auctionId",
        "indexed": true
      }
    ]
  },
  {
    "name": "NewAuction",
    "type": "event",
    "inputs": [
      {
        "type": "address",
        "name": "auctionCreator",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "auctionId",
        "indexed": true
      },
      {
        "type": "address",
        "name": "assetContract",
        "indexed": true
      },
      {
        "type": "tuple",
        "name": "auction",
        "components": [
          {
            "type": "uint256",
            "name": "auctionId"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "uint256",
            "name": "minimumBidAmount"
          },
          {
            "type": "uint256",
            "name": "buyoutBidAmount"
          },
          {
            "type": "uint64",
            "name": "timeBufferInSeconds"
          },
          {
            "type": "uint64",
            "name": "bidBufferBps"
          },
          {
            "type": "uint64",
            "name": "startTimestamp"
          },
          {
            "type": "uint64",
            "name": "endTimestamp"
          },
          {
            "type": "address",
            "name": "auctionCreator"
          },
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint8",
            "name": "tokenType"
          },
          {
            "type": "uint8",
            "name": "status"
          }
        ]
      }
    ]
  },
  {
    "name": "NewBid",
    "type": "event",
    "inputs": [
      {
        "type": "uint256",
        "name": "auctionId",
        "indexed": true
      },
      {
        "type": "address",
        "name": "bidder",
        "indexed": true
      },
      {
        "type": "address",
        "name": "assetContract",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "bidAmount"
      },
      {
        "type": "tuple",
        "name": "auction",
        "components": [
          {
            "type": "uint256",
            "name": "auctionId"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "uint256",
            "name": "minimumBidAmount"
          },
          {
            "type": "uint256",
            "name": "buyoutBidAmount"
          },
          {
            "type": "uint64",
            "name": "timeBufferInSeconds"
          },
          {
            "type": "uint64",
            "name": "bidBufferBps"
          },
          {
            "type": "uint64",
            "name": "startTimestamp"
          },
          {
            "type": "uint64",
            "name": "endTimestamp"
          },
          {
            "type": "address",
            "name": "auctionCreator"
          },
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint8",
            "name": "tokenType"
          },
          {
            "type": "uint8",
            "name": "status"
          }
        ]
      }
    ]
  },
  {
    "name": "bidInAuction",
    "type": "function",
    "stateMutability": "payable",
    "inputs": [
      {
        "type": "uint256",
        "name": "_auctionId"
      },
      {
        "type": "uint256",
        "name": "_bidAmount"
      }
    ],
    "outputs": []
  },
  {
    "name": "cancelAuction",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "uint256",
        "name": "_auctionId"
      }
    ],
    "outputs": []
  },
  {
    "name": "collectAuctionPayout",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "uint256",
        "name": "_auctionId"
      }
    ],
    "outputs": []
  },
  {
    "name": "collectAuctionTokens",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "uint256",
        "name": "_auctionId"
      }
    ],
    "outputs": []
  },
  {
    "name": "createAuction",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "tuple",
        "name": "_params",
        "components": [
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint256",
            "name": "minimumBidAmount"
          },
          {
            "type": "uint256",
            "name": "buyoutBidAmount"
          },
          {
            "type": "uint64",
            "name": "timeBufferInSeconds"
          },
          {
            "type": "uint64",
            "name": "bidBufferBps"
          },
          {
            "type": "uint64",
            "name": "startTimestamp"
          },
          {
            "type": "uint64",
            "name": "endTimestamp"
          }
        ]
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "auctionId"
      }
    ]
  },
  {
    "name": "getAllAuctions",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "uint256",
        "name": "_startId"
      },
      {
        "type": "uint256",
        "name": "_endId"
      }
    ],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "_allAuctions",
        "components": [
          {
            "type": "uint256",
            "name": "auctionId"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "uint256",
            "name": "minimumBidAmount"
          },
          {
            "type": "uint256",
            "name": "buyoutBidAmount"
          },
          {
            "type": "uint64",
            "name": "timeBufferInSeconds"
          },
          {
            "type": "uint64",
            "name": "bidBufferBps"
          },
          {
            "type": "uint64",
            "name": "startTimestamp"
          },
          {
            "type": "uint64",
            "name": "endTimestamp"
          },
          {
            "type": "address",
            "name": "auctionCreator"
          },
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint8",
            "name": "tokenType"
          },
          {
            "type": "uint8",
            "name": "status"
          }
        ]
      }
    ]
  },
  {
    "name": "getAllValidAuctions",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "uint256",
        "name": "_startId"
      },
      {
        "type": "uint256",
        "name": "_endId"
      }
    ],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "_validAuctions",
        "components": [
          {
            "type": "uint256",
            "name": "auctionId"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "uint256",
            "name": "minimumBidAmount"
          },
          {
            "type": "uint256",
            "name": "buyoutBidAmount"
          },
          {
            "type": "uint64",
            "name": "timeBufferInSeconds"
          },
          {
            "type": "uint64",
            "name": "bidBufferBps"
          },
          {
            "type": "uint64",
            "name": "startTimestamp"
          },
          {
            "type": "uint64",
            "name": "endTimestamp"
          },
          {
            "type": "address",
            "name": "auctionCreator"
          },
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint8",
            "name": "tokenType"
          },
          {
            "type": "uint8",
            "name": "status"
          }
        ]
      }
    ]
  },
  {
    "name": "getAuction",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "uint256",
        "name": "_auctionId"
      }
    ],
    "outputs": [
      {
        "type": "tuple",
        "name": "_auction",
        "components": [
          {
            "type": "uint256",
            "name": "auctionId"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "uint256",
            "name": "minimumBidAmount"
          },
          {
            "type": "uint256",
            "name": "buyoutBidAmount"
          },
          {
            "type": "uint64",
            "name": "timeBufferInSeconds"
          },
          {
            "type": "uint64",
            "name": "bidBufferBps"
          },
          {
            "type": "uint64",
            "name": "startTimestamp"
          },
          {
            "type": "uint64",
            "name": "endTimestamp"
          },
          {
            "type": "address",
            "name": "auctionCreator"
          },
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint8",
            "name": "tokenType"
          },
          {
            "type": "uint8",
            "name": "status"
          }
        ]
      }
    ]
  },
  {
    "name": "getWinningBid",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "uint256",
        "name": "_auctionId"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "_bidder"
      },
      {
        "type": "address",
        "name": "_currency"
      },
      {
        "type": "uint256",
        "name": "_bidAmount"
      }
    ]
  },
  {
    "name": "isAuctionExpired",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "uint256",
        "name": "_auctionId"
      }
    ],
    "outputs": [
      {
        "type": "bool"
      }
    ]
  },
  {
    "name": "isNewWinningBid",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "uint256",
        "name": "_auctionId"
      },
      {
        "type": "uint256",
        "name": "_bidAmount"
      }
    ],
    "outputs": [
      {
        "type": "bool"
      }
    ]
  },
  {
    "name": "totalAuctions",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256"
      }
    ]
  },
  {
    "name": "AcceptedOffer",
    "type": "event",
    "inputs": [
      {
        "type": "address",
        "name": "offeror",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "offerId",
        "indexed": true
      },
      {
        "type": "address",
        "name": "assetContract",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "tokenId"
      },
      {
        "type": "address",
        "name": "seller"
      },
      {
        "type": "uint256",
        "name": "quantityBought"
      },
      {
        "type": "uint256",
        "name": "totalPricePaid"
      }
    ]
  },
  {
    "name": "CancelledOffer",
    "type": "event",
    "inputs": [
      {
        "type": "address",
        "name": "offeror",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "offerId",
        "indexed": true
      }
    ]
  },
  {
    "name": "NewOffer",
    "type": "event",
    "inputs": [
      {
        "type": "address",
        "name": "offeror",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "offerId",
        "indexed": true
      },
      {
        "type": "address",
        "name": "assetContract",
        "indexed": true
      },
      {
        "type": "tuple",
        "name": "offer",
        "components": [
          {
            "type": "uint256",
            "name": "offerId"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "uint256",
            "name": "totalPrice"
          },
          {
            "type": "uint256",
            "name": "expirationTimestamp"
          },
          {
            "type": "address",
            "name": "offeror"
          },
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint8",
            "name": "tokenType"
          },
          {
            "type": "uint8",
            "name": "status"
          }
        ]
      }
    ]
  },
  {
    "name": "acceptOffer",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "uint256",
        "name": "_offerId"
      }
    ],
    "outputs": []
  },
  {
    "name": "cancelOffer",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "uint256",
        "name": "_offerId"
      }
    ],
    "outputs": []
  },
  {
    "name": "getAllOffers",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "uint256",
        "name": "_startId"
      },
      {
        "type": "uint256",
        "name": "_endId"
      }
    ],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "_allOffers",
        "components": [
          {
            "type": "uint256",
            "name": "offerId"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "uint256",
            "name": "totalPrice"
          },
          {
            "type": "uint256",
            "name": "expirationTimestamp"
          },
          {
            "type": "address",
            "name": "offeror"
          },
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint8",
            "name": "tokenType"
          },
          {
            "type": "uint8",
            "name": "status"
          }
        ]
      }
    ]
  },
  {
    "name": "getAllValidOffers",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "uint256",
        "name": "_startId"
      },
      {
        "type": "uint256",
        "name": "_endId"
      }
    ],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "_validOffers",
        "components": [
          {
            "type": "uint256",
            "name": "offerId"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "uint256",
            "name": "totalPrice"
          },
          {
            "type": "uint256",
            "name": "expirationTimestamp"
          },
          {
            "type": "address",
            "name": "offeror"
          },
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint8",
            "name": "tokenType"
          },
          {
            "type": "uint8",
            "name": "status"
          }
        ]
      }
    ]
  },
  {
    "name": "getOffer",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "type": "uint256",
        "name": "_offerId"
      }
    ],
    "outputs": [
      {
        "type": "tuple",
        "name": "_offer",
        "components": [
          {
            "type": "uint256",
            "name": "offerId"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "uint256",
            "name": "totalPrice"
          },
          {
            "type": "uint256",
            "name": "expirationTimestamp"
          },
          {
            "type": "address",
            "name": "offeror"
          },
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint8",
            "name": "tokenType"
          },
          {
            "type": "uint8",
            "name": "status"
          }
        ]
      }
    ]
  },
  {
    "name": "makeOffer",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "type": "tuple",
        "name": "_params",
        "components": [
          {
            "type": "address",
            "name": "assetContract"
          },
          {
            "type": "uint256",
            "name": "tokenId"
          },
          {
            "type": "uint256",
            "name": "quantity"
          },
          {
            "type": "address",
            "name": "currency"
          },
          {
            "type": "uint256",
            "name": "totalPrice"
          },
          {
            "type": "uint256",
            "name": "expirationTimestamp"
          }
        ]
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "_offerId"
      }
    ]
  },
  {
    "name": "totalOffers",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  }
]

export default myNFTAbi