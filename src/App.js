import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import logo from './meditation.jpeg';
import './App.css';
import web3 from './web3';
import contractinfo from './contractinfo';

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
      e_amount:0,
      totalsupply:0,
      b_amount:0,
      web3:false
    };
    web3.eth.net.isListening().then(this.state.isConnected = true)
  }

  onSubmit = async (event) => {
		event.preventDefault();
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
        //web3.eth.getAccounts().then(function(results){this.setState({account:results[0]}),this.setState({account:''})});
    }
  }
}

   metamaskLogin = async (event) => {
		const accounts = await web3.eth.getAccounts();
        const b_account = accounts[0];
	    const e_account= await contractinfo.options.address;

         this.setState({b_account:b_account});
         var err,wei = await web3.eth.getBalance(b_account);
         var err,wei2 = await contractinfo.methods.balanceOf(b_account).call();
         var err,blak = await contractinfo.methods.increaseSupply(3).call();
         var err,total = await contractinfo.methods.totalSupply().call();
         this.setState({b_amount:wei2});
         this.setState({e_account:wei});
         this.setState({totalsupply:total});
         //var v = await contractinfo.methods.balanceOf(accounts[0]).call();
		//his.setState({e_account:contract_address});

       //var r = await contractinfo.methods.totalSupply({from:contract_address}).call();
        // this.setState({totalsupply:Number(r)});
       //contract.methods.transfer(toAddress, value).send({from: fromAddress})
//.on('transactionHash', function(hash){
 // console.log(hash);
//});
         //contractinfo.methods.increaseSupply(4);
         //const contract = await contractinfo.options['address'];
     //  console.log(contract);
         //contractinfo.methods.approve(contract,10);


    }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    if (this.state.web3){
    return (
      <div className="App" className="App-header">
        <h1>Get Balance</h1>
        <p>{this.state.isConnected?'You are connected to Ropsten test network':'You are not connected'}</p>
        <Button  variant="contained" color="primary"  onClick={() => this.metamaskLogin()}>
        Connect your account via metamask
        </Button>

        <Grid container spacing={16}>
        <Grid item xs={12}>
          <Grid container  justify="center" spacing={Number(spacing)}>
              <Grid>
                    <Typography variant="h5" component="h3">
                            <p>
                            Balance Wallet Address: {this.state.b_account}
                            </p>
                    </Typography>
        </Grid>
        <Grid>
                    <Typography variant="h5" component="h3">
                            <p>
                            Total Balance Tokens: {this.state.totalsupply}
                            </p>
                    </Typography>
        </Grid>
        </Grid>

          <Grid container  justify="center" spacing={Number(spacing)}>
        <Grid>
        </Grid>
        <Grid>
                            Eth Wallet Address:</Grid><Grid> {this.state.e_account}
        </Grid>
        </Grid>
          <Grid container  justify="center" spacing={Number(spacing)}>
        <Grid>
                            Balance Tokens {this.state.b_amount}
              </Grid>
          </Grid>
        </Grid>
        </Grid>
        <h3>What did you do?</h3>

        <Button variant="contained" onClick={() => this.metamaskLogin()}>
          meditate
        </Button>
        OR
        <Button variant="contained" onClick={() => this.metamaskLogin()}>
         Like stuff on Social Media
        </Button>
        <p>
          <a
            className="App-link"
            href="https://github.com/consciouscomputation"
            target="_blank"
            rel="noopener noreferrer"
          >
            Computer Tooling Consciousness
          </a>
    </p>
      </div>
    );


  }else{
    return (
      <div className="App" className="App-header">
        <h1>Get Balance</h1>
        <h3>To use Balance please install <a href="https://metamask.io">Metamask</a> and get some ropsten either</h3>
        </div>
    );
  }

  }
}

export default App;
