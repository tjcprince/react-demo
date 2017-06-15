import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import Pagination from './pagination';
import fetch from 'isomorphic-fetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      currentPage: 0,
      totalPages: 100,
      showPages: 5
    };
    this.onPageNumberChange = this.onPageNumberChange.bind(this);
  }
  componentDidMount() {
    fetch('http://localhost:3007/users/queryUsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({currentPage: this.state.currentPage})
    }).then((res) => {
      return res.json()
    }).then((data) => {
      this.setState({list: data.list});
    }).catch((e) => {
      console.log(e.message)
    })
  }
  onPageNumberChange(number) {
    fetch('http://localhost:3007/users/queryUsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({currentPage: number})
    }).then((res) => {
      return res.json()
    }).then((data) => {
      this.setState({currentPage: number, list: data.list});
    }).catch((e) => {
      console.log(e.message)
    })
  }
  render() {

    return (
      <div className="app container">
        <table className="table">
          <caption>分页表格</caption>
          <thead>
            <tr>
              <th>id</th>
              <th>名字</th>
              <th>年龄</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map((obj) => (
              <tr key={obj.id}>
                <td>{obj.id}</td>
                <td>{obj.name}</td>
                <td>{obj.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination className="pagination pull-right" currentPage={this.state.currentPage} totalPages={this.state.totalPages} showPages={this.state.showPages} onChangePage={this.onPageNumberChange}/>
      </div>
    );
  }
}

export default App;
