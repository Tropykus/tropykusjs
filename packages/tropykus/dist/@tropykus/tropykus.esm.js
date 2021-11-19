import { ethers, Wallet } from 'ethers';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var ComptrollerAbi = [
	{
		inputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "string",
				name: "action",
				type: "string"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "pauseState",
				type: "bool"
			}
		],
		name: "ActionPaused",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "string",
				name: "action",
				type: "string"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "pauseState",
				type: "bool"
			}
		],
		name: "ActionPaused",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "CompGranted",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newSpeed",
				type: "uint256"
			}
		],
		name: "CompSpeedUpdated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "contributor",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newSpeed",
				type: "uint256"
			}
		],
		name: "ContributorCompSpeedUpdated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "compDelta",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "compBorrowIndex",
				type: "uint256"
			}
		],
		name: "DistributedBorrowerComp",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "supplier",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "compDelta",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "compSupplyIndex",
				type: "uint256"
			}
		],
		name: "DistributedSupplierComp",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "error",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "info",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "detail",
				type: "uint256"
			}
		],
		name: "Failure",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "isComped",
				type: "bool"
			}
		],
		name: "MarketComped",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "MarketEntered",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "MarketExited",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			}
		],
		name: "MarketListed",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newBorrowCap",
				type: "uint256"
			}
		],
		name: "NewBorrowCap",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldBorrowCapGuardian",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newBorrowCapGuardian",
				type: "address"
			}
		],
		name: "NewBorrowCapGuardian",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "oldCloseFactorMantissa",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newCloseFactorMantissa",
				type: "uint256"
			}
		],
		name: "NewCloseFactor",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "oldCollateralFactorMantissa",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newCollateralFactorMantissa",
				type: "uint256"
			}
		],
		name: "NewCollateralFactor",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "oldCompRate",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newCompRate",
				type: "uint256"
			}
		],
		name: "NewCompRate",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "oldLiquidationIncentiveMantissa",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newLiquidationIncentiveMantissa",
				type: "uint256"
			}
		],
		name: "NewLiquidationIncentive",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "oldPauseGuardian",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newPauseGuardian",
				type: "address"
			}
		],
		name: "NewPauseGuardian",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "contract PriceOracle",
				name: "oldPriceOracle",
				type: "address"
			},
			{
				indexed: false,
				internalType: "contract PriceOracle",
				name: "newPriceOracle",
				type: "address"
			}
		],
		name: "NewPriceOracle",
		type: "event"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address[]",
				name: "cTokens",
				type: "address[]"
			}
		],
		name: "_addCompMarkets",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract Unitroller",
				name: "unitroller",
				type: "address"
			}
		],
		name: "_become",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "_borrowGuardianPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			}
		],
		name: "_dropCompMarket",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "_grantComp",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "_mintGuardianPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "newBorrowCapGuardian",
				type: "address"
			}
		],
		name: "_setBorrowCapGuardian",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "bool",
				name: "state",
				type: "bool"
			}
		],
		name: "_setBorrowPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "newCloseFactorMantissa",
				type: "uint256"
			}
		],
		name: "_setCloseFactor",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "newCollateralFactorMantissa",
				type: "uint256"
			}
		],
		name: "_setCollateralFactor",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "compRate_",
				type: "uint256"
			}
		],
		name: "_setCompRate",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "contributor",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "compSpeed",
				type: "uint256"
			}
		],
		name: "_setContributorCompSpeed",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "newLiquidationIncentiveMantissa",
				type: "uint256"
			}
		],
		name: "_setLiquidationIncentive",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract CToken[]",
				name: "cTokens",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "newBorrowCaps",
				type: "uint256[]"
			}
		],
		name: "_setMarketBorrowCaps",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "bool",
				name: "state",
				type: "bool"
			}
		],
		name: "_setMintPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "newPauseGuardian",
				type: "address"
			}
		],
		name: "_setPauseGuardian",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract PriceOracle",
				name: "newOracle",
				type: "address"
			}
		],
		name: "_setPriceOracle",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bool",
				name: "state",
				type: "bool"
			}
		],
		name: "_setSeizePaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bool",
				name: "state",
				type: "bool"
			}
		],
		name: "_setTransferPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			}
		],
		name: "_supportMarket",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "accountAssets",
		outputs: [
			{
				internalType: "contract CToken",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "admin",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "allMarkets",
		outputs: [
			{
				internalType: "contract CToken",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "borrowAmount",
				type: "uint256"
			}
		],
		name: "borrowAllowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "borrowCapGuardian",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "borrowCaps",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "borrowGuardianPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "borrowAmount",
				type: "uint256"
			}
		],
		name: "borrowVerify",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "contract CToken",
				name: "cToken",
				type: "address"
			}
		],
		name: "checkMembership",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "holder",
				type: "address"
			},
			{
				internalType: "contract CToken[]",
				name: "cTokens",
				type: "address[]"
			}
		],
		name: "claimComp",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address[]",
				name: "holders",
				type: "address[]"
			},
			{
				internalType: "contract CToken[]",
				name: "cTokens",
				type: "address[]"
			},
			{
				internalType: "bool",
				name: "borrowers",
				type: "bool"
			},
			{
				internalType: "bool",
				name: "suppliers",
				type: "bool"
			}
		],
		name: "claimComp",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "holder",
				type: "address"
			}
		],
		name: "claimComp",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "closeFactorMantissa",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "compAccrued",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "compBorrowState",
		outputs: [
			{
				internalType: "uint224",
				name: "index",
				type: "uint224"
			},
			{
				internalType: "uint32",
				name: "block",
				type: "uint32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "compBorrowerIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "compClaimThreshold",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "compContributorSpeeds",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "compInitialIndex",
		outputs: [
			{
				internalType: "uint224",
				name: "",
				type: "uint224"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "compRate",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "compSpeeds",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "compSupplierIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "compSupplyState",
		outputs: [
			{
				internalType: "uint224",
				name: "index",
				type: "uint224"
			},
			{
				internalType: "uint32",
				name: "block",
				type: "uint32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "comptrollerImplementation",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address[]",
				name: "cTokens",
				type: "address[]"
			}
		],
		name: "enterMarkets",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cTokenAddress",
				type: "address"
			}
		],
		name: "exitMarket",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "getAccountLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getAllMarkets",
		outputs: [
			{
				internalType: "contract CToken[]",
				name: "",
				type: "address[]"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "getAssetsIn",
		outputs: [
			{
				internalType: "contract CToken[]",
				name: "",
				type: "address[]"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getBlockNumber",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getCompAddress",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "address",
				name: "cTokenModify",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "redeemTokens",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "borrowAmount",
				type: "uint256"
			}
		],
		name: "getHypotheticalAccountLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "isComptroller",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "lastContributorBlock",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cTokenBorrowed",
				type: "address"
			},
			{
				internalType: "address",
				name: "cTokenCollateral",
				type: "address"
			},
			{
				internalType: "address",
				name: "liquidator",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			}
		],
		name: "liquidateBorrowAllowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cTokenBorrowed",
				type: "address"
			},
			{
				internalType: "address",
				name: "cTokenCollateral",
				type: "address"
			},
			{
				internalType: "address",
				name: "liquidator",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "actualRepayAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "seizeTokens",
				type: "uint256"
			}
		],
		name: "liquidateBorrowVerify",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "cTokenBorrowed",
				type: "address"
			},
			{
				internalType: "address",
				name: "cTokenCollateral",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "actualRepayAmount",
				type: "uint256"
			}
		],
		name: "liquidateCalculateSeizeTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "liquidationIncentiveMantissa",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "markets",
		outputs: [
			{
				internalType: "bool",
				name: "isListed",
				type: "bool"
			},
			{
				internalType: "uint256",
				name: "collateralFactorMantissa",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "isComped",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "maxAssets",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "minter",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "mintAmount",
				type: "uint256"
			}
		],
		name: "mintAllowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "mintGuardianPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "minter",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "actualMintAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "mintTokens",
				type: "uint256"
			}
		],
		name: "mintVerify",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "oracle",
		outputs: [
			{
				internalType: "contract PriceOracle",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "pauseGuardian",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "pendingAdmin",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "pendingComptrollerImplementation",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "redeemer",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "redeemTokens",
				type: "uint256"
			}
		],
		name: "redeemAllowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "redeemer",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "redeemAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "redeemTokens",
				type: "uint256"
			}
		],
		name: "redeemVerify",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "refreshCompSpeeds",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "payer",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "repayAmount",
				type: "uint256"
			}
		],
		name: "repayBorrowAllowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "payer",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "actualRepayAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "borrowerIndex",
				type: "uint256"
			}
		],
		name: "repayBorrowVerify",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cTokenCollateral",
				type: "address"
			},
			{
				internalType: "address",
				name: "cTokenBorrowed",
				type: "address"
			},
			{
				internalType: "address",
				name: "liquidator",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "seizeTokens",
				type: "uint256"
			}
		],
		name: "seizeAllowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "seizeGuardianPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cTokenCollateral",
				type: "address"
			},
			{
				internalType: "address",
				name: "cTokenBorrowed",
				type: "address"
			},
			{
				internalType: "address",
				name: "liquidator",
				type: "address"
			},
			{
				internalType: "address",
				name: "borrower",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "seizeTokens",
				type: "uint256"
			}
		],
		name: "seizeVerify",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "src",
				type: "address"
			},
			{
				internalType: "address",
				name: "dst",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "transferTokens",
				type: "uint256"
			}
		],
		name: "transferAllowed",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "transferGuardianPaused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "cToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "src",
				type: "address"
			},
			{
				internalType: "address",
				name: "dst",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "transferTokens",
				type: "uint256"
			}
		],
		name: "transferVerify",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "tropAddress",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "contributor",
				type: "address"
			}
		],
		name: "updateContributorRewards",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	}
];

var Comptroller = function () {
  function Comptroller(contractAddress, ethersProvider) {
    _classCallCheck(this, Comptroller);
    this.ethersProvider = ethersProvider;
    this.instance = new ethers.Contract(contractAddress, ComptrollerAbi, this.ethersProvider);
  }
  _createClass(Comptroller, [{
    key: "allMarkets",
    value: function allMarkets() {
      var _this = this;
      return new Promise(function (resolve, reject) {
        _this.instance.callStatic.getAllMarkets().then(resolve)["catch"](reject);
      });
    }
  }, {
    key: "getAssetsIn",
    value: function getAssetsIn(account) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        _this2.instance.callStatic.getAssetsIn(account.address).then(resolve)["catch"](reject);
      });
    }
  }, {
    key: "enterMarkets",
    value: function enterMarkets(account, marketAddresses) {
      var _this3 = this;
      console.log(account);
      return new Promise(function (resolve, reject) {
        _this3.instance.connect(account).enterMarkets(marketAddresses).then(resolve)["catch"](reject);
      });
    }
  }]);
  return Comptroller;
}();

var Tropykus = function () {
  function Tropykus(providerURL) {
    _classCallCheck(this, Tropykus);
    this.ethersProvider = new ethers.providers.JsonRpcProvider(providerURL);
    this.internalComptroller = null;
    this.internalAccount = null;
  }
  _createClass(Tropykus, [{
    key: "comptroller",
    get: function get() {
      return this.internalComptroller;
    }
  }, {
    key: "setComptroller",
    value: function setComptroller(comptrollerAddress) {
      this.internalComptroller = new Comptroller(comptrollerAddress, this.ethersProvider);
    }
  }, {
    key: "account",
    get: function get() {
      return this.internalAccount;
    }
  }, {
    key: "setAccount",
    value: function setAccount(mnemonic) {
      this.internalAccount = Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/0").connect(this.ethersProvider);
    }
  }]);
  return Tropykus;
}();

export { Tropykus as default };
