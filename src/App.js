import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import logo from './meditation.jpeg';
import './App.css';
import web3 from './web3';
import contractinfo from './contractinfo';
import {grey, amber, blue} from '@material-ui/core/colors'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gasUsed:'',
      txReceipt: '' ,
      value: null,
      isConnected:false,
      b_account:null,
      e_account:null,
      to_address:null,
      e_amount:0,
      totalsupply:0,
      b_amount:0,
      web3:false
    };
    web3.eth.net.isListening().then(this.state.isConnected = true);
  };

   componentWillMount() {
        if (typeof web3.web3 !== 'undefined') {
              this.setState({web3:false});
              this.setState({isConnected:false});
        }else{
                if (!(window.ethereum || window.web3)){
                    web3 = null
                    this.setState({isConnected:false});
                }else{
                    this.setState({isConnected:true});
                    this.setState({web3:true});
                }
        }
    }

   transfer = async (event) => {
       try{
      this.setState({to_address: event.target.value});
        var a = await contractinfo.methods.transfer(event.target.value, 3000).send({from:this.state.b_account}).call();

   }catch(e){console.log(e);}
   }
   decrease = async (event) => {
       var r = await contractinfo.methods.decreaseSupply(500).call();
   }
   increase = async (event) => {
       var r = await contractinfo.methods.increaseSupply(500).call();
        console.log(r);
       var err,total = await contractinfo.methods.totalSupply().call();
         this.setState({totalsupply:total});
   }
   metamaskLogin = async (event) => {
       try{
		const accounts = await web3.eth.getAccounts();
        const b_account = accounts[0];
	    const e_account= await contractinfo.options.address;
         var err,total = await contractinfo.methods.totalSupply().call();
         var err,wei = await web3.eth.getBalance(e_account);
         var err,wei2 = await contractinfo.methods.balanceOf(b_account).call();
         this.setState({b_amount:wei2});
         this.setState({e_amount:wei});
         this.setState({e_account:e_account});
         this.setState({b_account:b_account});
         this.setState({totalsupply:total});
       }catch(e){
           console.log(e);
           this.setState({web3:false});

       }
   }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    if (this.state.web3){
        if (this.state.b_account){
    return (
      <div className="App" className="App-header">
        <h1>Get Balance</h1>
        <p>{this.state.isConnected?'You are connected to Ropsten test network':'You are not connected'}</p>
        <Grid container spacing={8}>
            <Grid container item xs={12} spacing={24}>

              <Grid item xs={4}>
              </Grid>
              <Grid item xs={2}>
                    Balance Wallet
               </Grid>
              <Grid item xs={6}>
                    {this.state.b_account}
              </Grid>
            </Grid>

            <Grid container item xs={12} spacing={24}>
              <Grid item xs={4}>
              </Grid>
              <Grid item xs={2}>
                    Balance Tokens
               </Grid>
              <Grid item xs={6}>
                    {this.state.b_amount}
              </Grid>
            </Grid>

            <Grid container item xs={12} spacing={24}>
              <Grid item xs={4}>
              </Grid>
              <Grid item xs={2}>
                    Total Supply
               </Grid>
              <Grid item xs={6}>
                    {this.state.totalsupply}
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={24}>
              <Grid item xs={4}>
              </Grid>
              <Grid item xs={2}>
                    Ethereum Wallet
               </Grid>
              <Grid item xs={6}>
            <p> {this.state.e_account}</p>
              </Grid>
            </Grid>
        </Grid>
        <div>
                    <Button color="primary" variant="contained" onClick={() => this.increase()}>
                        meditate
                    </Button>
                    <Button color="primary" variant="contained" onClick={() => this.decrease()}>
                        social media
                    </Button>
                    <p>
                          <div>Now... send someone balance!</div>
                          <TextField
                            onChange={(e) => this.transfer(e)}
                            id="standard-name"
                            label="Address"
                             value={this.state.to_address}
                            margin="normal"
                          />
                    </p>
        </div>
        <div>
        <Button  variant="contained" color="primary"  onClick={() => this.metamaskLogin()}>
        Reconnect or connect to another account  via metamask
        </Button>
        </div>
        <div>
          <a
            className="App-link"
            href="https://github.com/consciouscomputation"
            target="_blank"
            rel="noopener noreferrer"
          >
            Computer Tooling Consciousness
          </a>
    </div>
      </div>
    );

            }else{
                return(
      <div className="App" className="App-header">
        <h1>Get Balance</h1>
        <Button  variant="contained" color="primary"  onClick={() => this.metamaskLogin()}>
        Connect your account via metamask
        </Button>
                    </div>
                );

            }

  }else{
    return (
      <div className="App" className="App-header">
        <h1>Get Balance</h1>
        <h3>To use Balance please install <a href="https://metamask.io">Metamask</a>, make sure you are logged into metamask, and get some ropsten either</h3>
        </div>
    );
  }

  }
}

export default App;
