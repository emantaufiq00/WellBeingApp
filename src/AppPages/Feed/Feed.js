import React, { Component } from "react";
import FirebaseService from '../../firebaseservice'
import app from '../../firebaseconfig'
import moment from 'moment'
import ButtonAppBar from '../Home'
import "./Feed.css";

let userAuth = app.auth().currentUser;
class Feed extends Component {
  emptyPost = {
    FirstName: '',
    LastName: '',
    Date: '',
    Title: '',
    Description: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      info: {
        FirstName: '',
        LastName: '',
        Email: '',
        Department: ''
      },
      post: this.emptyPost,
      posts: [],
      isLoading: true,
      globalFeed: true
    };
    console.log(this.state.globalFeed)
  }

  componentDidMount = () => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in")
        userAuth = user
        console.log(userAuth)
        FirebaseService.getAllPosts().once("value", this.onDataChange);
        FirebaseService.getInfo(userAuth.uid).on("value", this.onGetInfo);

      } else {
        console.log("User not logged in")
      }
    });
    if (this.state.isLoading === true) {
      this.setState({ isLoading: false })
    }
    if (userAuth !== null) {
      console.log(userAuth.uid)
    }
  }

  switchFilter = () => {
    if (this.state.globalFeed === true) {
      console.log("switched to global")
      console.log(userAuth);
      FirebaseService.getAllPosts().once("value", this.onDataChange);

    } else {
      console.log("switched to local")
      console.log(userAuth)
      FirebaseService.getAllPosts().once("value", this.onDataChange);
    }
  }

  componentWillUnmount = () => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in")
        userAuth = user
        console.log(userAuth)
        FirebaseService.getAllPosts().off("value", this.onDataChange);
        FirebaseService.getInfo(userAuth.uid).on("value", this.onGetInfo);

      } else {
        console.log("User not logged in")
      }
    });
    if (this.state.isLoading === true) {
      this.setState({ isLoading: false })
    }
    if (userAuth !== null) {
      console.log(userAuth.uid)
    }
  }

  onGetInfo = (item) => {
    console.log(item);
    let data = item.val();
    this.setState({
      info: {
        FirstName: data.FirstName,
        LastName: data.LastName,
        Email: data.Email,
        Department: data.EmpDept
      }
    });
  }

  onDataChange = (items) => {
    console.log(items);
    let posts = [];
    items.forEach(item => {
      let data = item.val();
      if (this.state.globalFeed) {
        posts.push({
          key: item.key,
          firstname: data.FirstName,
          lastname: data.LastName,
          date: data.Date,
          title: data.Title,
          description: data.Description
        });
      }
      else {
        if (data.Department === this.state.info.Department) {
          posts.push({
            key: item.key,
            firstname: data.FirstName,
            lastname: data.LastName,
            date: data.Date,
            title: data.Title,
            description: data.Description
          });
        }
      }
    });

    const newList = posts.sort((a, b) => {
      return moment(b.date).diff(a.date)
    });

    this.setState({
      posts: newList,
      isLoading: false
    });

    console.log(this.state.posts)
  }

  checkFeedState = () => {
    this.setState((prevState) => ({
      globalFeed: !prevState.globalFeed
    }));
    this.switchFilter();
  };

  globalFeed = () => {
    return <div>Global feed</div>;
  };

  localFeed = () => {
    return <div>Local feed</div>;
  };

  // showPopup = async (e) => {
  //   return <p class="popuptext" id="myPopup">A Simple Popup!</p>

  // }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, desc } = e.target.elements;
    console.log(title.value)
    console.log(desc.value)
    const unixtime = Math.round(new Date() / 1000);

    this.state.post = {
      Date: unixtime,
      Department: this.state.info.Department,
      Description: desc.value,
      FirstName: this.state.info.FirstName,
      LastName: this.state.info.LastName,
      Title: title.value
    };

    console.log(this.state.post)
    FirebaseService.addPost(this.state.post);
    FirebaseService.getAllPosts().once("value", this.onDataChange);
  }



  render() {
    const { isLoading, posts } = this.state;

    const postList = posts.map(item => {
      let datet = new Date(item.date * 1000);
      const format = moment(datet).format('DD/MM/YYYY HH:mm:ss');
      return <div key={item.key}>
        <p style={{ whiteSpace: 'nowrap' }}>{item.firstname} {item.lastname}</p>
        <p>{format}</p>
        <h5>{item.title}</h5>
        <p>{item.description}</p><br /><br />
      </div>
    });
    console.log(postList)

    if (isLoading === true) {
      return <p>Loading...</p>
    }
    return (
      <div>
        <ButtonAppBar /><br />
        <label className="switch">
          <input type="checkbox" onClick={this.checkFeedState} />
          <span className="slider round"></span>
        </label>

        <div className="switchLabel">
          {this.state.globalFeed ? this.globalFeed() : this.localFeed()}
        </div>

        <div className="userHolder">
          {" "}
          <b>Name:</b> {this.state.info.FirstName} {this.state.info.LastName}{" "}
          <br />
          <b>Department: </b>{this.state.info.Department}{" "}
        </div><br />
        <form onSubmit={this.handleSubmit}>
          <div>
            <label className="boxHeading">Title: &nbsp;</label>
            <input className="enterTitle" name="title" id="title" placeholder="Enter Title" type="text" onChange={e => e.target.value} required />
          </div>
          <div>
            <textarea className="enterData" name="desc" id="desc" type="text" placeholder="What do you wish to say?" onChange={e => e.target.value} required />
            <br />
            <button className="postButton" type="btnsubmit">Post</button>
            <input className="Reset" type="reset" value="Clear" />


          </div>
        </form>
        <br />
        <div>
          {posts.map(item => {
            let datet = new Date(item.date * 1000);
            const format = moment(datet).format('MMM Do');
            return <div key={item.key}>
              <div className="feedBox">
                <p className="feedUser" style={{ whiteSpace: 'nowrap' }}>{format} · {item.firstname} {item.lastname}</p>
                <p className="feedTitle">{item.title}</p>
                <p className="feedDescription">{item.description}</p>
              </div>
            </div>
          })}
        </div>
      </div >
    );
  }
}

export default Feed;
