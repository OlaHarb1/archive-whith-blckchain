import Web3 from 'web3';


export const Web3Functions = {
    loadWeb3 : async () => {
        if(window.etheruem){
            window.web3 = new Web3(window.etheruem)
            await window.etheruem.enable()
          } if(window.web3){
            window.web3 = new Web3(window.web3.currentProvider)
          } else {
            window.alert('please use metaMask')
          }
          const web3 = window.web3
          const accounts = await web3.eth.getAccounts()
          return accounts
        }
    }