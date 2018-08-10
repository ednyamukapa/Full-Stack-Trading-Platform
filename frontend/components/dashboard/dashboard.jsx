import React    from 'react';
import { Link, withRouter } from 'react-router-dom';
import DashboardSidebar from './dashboard_sidebar/dashboard_sidebar';
import DashboardChart from '../charts/dashboard_chart/dashboard_chart';
import SearchBar from '../navbar/search/search_container';


class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.marketNews = this.marketNews.bind(this);
    this.topStocks = this.topStocks.bind(this);
    this.state = {
      loading: true,
    };
  }


  componentDidMount() {
    // this.props.fetchStocks();
    this.props.fetchPortfolio(this.props.currentUser.id)
      .then(() => this.props.fetchPortfolioSnapshots(this.props.currentUser.id))
      .then(() => this.setState({loading: false}))
      .then(() => this.props.fetchMarketNews())
      .then(() => this.props.fetchTopStocks())
  }

  marketNews() {
    let marketNews = [];
    for (let i = 0; i < this.props.marketNews.length; i++) {
      let article = this.props.marketNews[i];
      marketNews.push(
        <li className="article-box">
          <div className="article-title"><a href={article.url}>{article.headline}</a></div>
          <div className="article-body">{article.summary}</div>
        </li>
      )
    }

    return marketNews;
  }

  topStocks() {
    let topStocks = [];
    for (var i = 0; i < this.props.topStocks.length; i++) {
      let topStock = this.props.topStocks[i];
      topStocks.push(
        <li className="topStock" key={i}>
          <Link to={`/stocks/${this.props.topStocks[i].symbol}`}>{this.props.topStocks[i].symbol}</Link>
        </li>
      )
    }

    return topStocks;
  }

  // const peers = this.props.peers.map((peerSymbol, i) => {
  //   return (
  //     <li className="peer" key={i}>
  //       <Link to={`/stocks/${peerSymbol}`}>{peerSymbol}</Link>
  //     </li>
  //   );
  // });

  render() {

    if (this.state.loading) {
      return <div>loading...</div>
    } else {
      return (
        <div className="dashboard-page">


          <nav className="greeting-page-navbar-box">
            <div className="greeting-page-navbar-left">
              <Link to="/">
                <img className="logo-image" src={window.logo} />
              </Link>
            </div>
            <div className="greeting-page-navbar-right">
              <SearchBar />
              <button className="header-button" onClick={this.props.logout}>Log Out</button>
            </div>
          </nav>
          
          <div>
            <h1 className="dashboard-title">Welcome, {this.props.currentUser.first_name} </h1>
          </div>

          <div id="top-stocks-title">
            Today's Top Stocks
          </div>
          <div className="top-stocks-box">
              <ul>
                {this.topStocks()}
              </ul>
          </div>

          <div id="market-news-title">
            Latest Market News
          </div>
          <div className='news-box'>
            <ul>
              {this.marketNews()}
            </ul>
          </div>

        </div>
      );
    }
  };

};



export default Dashboard




//
// componentDidMount() {
//   console.log('hello world')
//   const user = this.props.currentUser;
//   // User object is available
//   console.log(user);
//   // const { stockWatchList = ['AAPL', 'MSFT'] } = user;
//   const stockWatchList = ['AAPL', 'MSFT'];
//
//   Promise.all(
//     stockWatchList.map(stockSym => {
//       return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSym}&interval=1min&apikey=PK7DV11EJ8OQEYVU`)
//       .then(res => res.json())
//     })
//   ).then(stockResponses => {
//
//     //      console.log(Object.keys(stockResponses[0], stockResponses[0]['Time Series (1min)']), '<<<<<')
//     const data = Object.keys(stockResponses[0]['Time Series (Daily)']).map(key => {
//       return {
//         name: key,
//         value: parseFloat(stockResponses[0]['Time Series (Daily)'][key]["3. low"])
//       }
//     })
//     console.log('>>>>>>', data)
//     this.setState({stocks: data })
//     //console.log(data);
//     return data;
//   }).then(res => console.log(res))
// }
