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
      account:null,
      eth:0,
      totalsupply:0,
      wha:null,
      balance:0
    };
    web3.eth.net.isListening().then(this.state.isConnected = true)
  }

  onSubmit = async (event) => {
		event.preventDefault();
  };

   componentWillMount() {

   if (!(window.ethereum || window.web3)){
    web3 = null
    this.setState({isConnected:false});
    alert('You have to install MetaMask !');
    }else{
        //web3.eth.getAccounts().then(function(results){this.setState({account:results[0]}),this.setState({account:''})});
    }
  }

   metamaskLogin = async (event) => {
		const accounts = await web3.eth.getAccounts();

         this.setState({account:accounts[0]});
         var err,wei = await web3.eth.getBalance(this.state.account);
         this.setState({eth:web3.utils.fromWei(wei)});
         this.setState({balance:contractinfo.methods.balanceOf(accounts[0])});
         this.setState({totalsupply:Number(contractinfo.methods.totalSupply())});
         var v = await contractinfo.methods.balanceOf(accounts[0]).call();
         var q = await contractinfo.methods.totalSupply().call();
        alert(q);

       contractinfo.methods.totalSupply().call().then(function(res){
    console.log(res);
}).catch(function(err) {
});
		const ethAddress= await contractinfo.options.address;
		this.setState({wha:ethAddress});
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
                            Balance Wallet Address: {this.state.account}
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
                            ETH Tokens:</Grid><Grid> {this.state.eth}
        </Grid>
        <Grid>
                            Eth Wallet Address:</Grid><Grid> {this.state.wha}
        </Grid>
        </Grid>
          <Grid container  justify="center" spacing={Number(spacing)}>
        <Grid>
                <Paper>
                    <Typography variant="h5" component="h3">
                            <p>
                            Balance Tokens {this.state.balance}
                            </p>
                    </Typography>
                </Paper>
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
  }
}

export default App;
