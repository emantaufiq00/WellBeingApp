import React, { Component } from "react";
import FirebaseService from '../../firebaseservice'
import app from '../../firebaseconfig'
import moment from 'moment'
import ButtonAppBar from '../navBar'
import liked from '../images/liked.svg'
import like from '../images/like.svg'
import "./Feed.css";

let userAuth = app.auth().currentUser;
let flag = false;
class Feed extends Component {
  emptyPost = {
    UserID: '',
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
      likelist: [],
      isLoading: true,
      globalFeed: true,
      templist: [],
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

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.likelist !== this.state.likelist && flag === false) {
      FirebaseService.getAllPosts().once("value", this.onDataChange)
      flag = true;
    }
  }

  componentWillUnmount = () => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in")
        userAuth = user
        console.log(userAuth)
        FirebaseService.getAllPosts().off("value", this.onDataChange);
        FirebaseService.getInfo(userAuth.uid).off("value", this.onGetInfo);

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
    try {
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
    } catch (error) {}
  }

  getLikes = (key) => {
    FirebaseService.getLike(key).on("value", this.onLikeChange)
  }

  onLikeChange = (items) => {
    this.setState({ likelist: [] })
    console.log(items);
    items.forEach(item => {
      let data = item.val();
      this.state.likelist.push({
        key: item.key,
        id: data.UserID
      })
    });
    console.log(this.state.likelist)

  }


  onLikesPost = (items) => {
    this.setState({ templist: [] });
    console.log(items);
    items.forEach(item => {
      let data = item.val();
      this.state.templist.push({
        key: item.key,
        id: data.UserID
      })
    });

  }



  onDataChange = (items) => {
    let posts = [];
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.likelist = [];
    items.forEach(item => {
      let data = item.val();
      let likeflag = false
      console.log(item.key)
      this.getLikes(item.key);


      if (this.state.globalFeed) {
        let i;
        for (i = 0; i < this.state.likelist.length; i++) {
          if (this.state.likelist[i].id === userAuth.uid) {
            likeflag = true
          }
        }
        if (likeflag === true) {
          posts.push({
            key: item.key,
            firstname: data.FirstName,
            lastname: data.LastName,
            date: data.Date,
            title: data.Title,
            description: data.Description,
            liked: true,
            count: this.state.likelist.length
          })
        } else {
          posts.push({
            key: item.key,
            firstname: data.FirstName,
            lastname: data.LastName,
            date: data.Date,
            title: data.Title,
            description: data.Description,
            liked: false,
            count: this.state.likelist.length
          })
        }
      }

      else {
        if (data.Department === this.state.info.Department) {
          let i;
          for (i = 0; i < this.state.likelist.length; i++) {
            if (this.state.likelist[i].id === userAuth.uid) {
              likeflag = true
            }
          }
          if (likeflag === true) {
            posts.push({
              key: item.key,
              firstname: data.FirstName,
              lastname: data.LastName,
              date: data.Date,
              title: data.Title,
              description: data.Description,
              liked: true,
              count: this.state.likelist.length
            })
          } else {
            posts.push({
              key: item.key,
              firstname: data.FirstName,
              lastname: data.LastName,
              date: data.Date,
              title: data.Title,
              description: data.Description,
              liked: false,
              count: this.state.likelist.length
            })
          }
          console.log(likeflag)
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


  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, desc } = e.target.elements;
    console.log(title.value)
    console.log(desc.value)
    const unixtime = Math.round(new Date() / 1000);

    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.post = {
      Date: unixtime,
      Department: this.state.info.Department,
      Description: desc.value,
      FirstName: this.state.info.FirstName,
      LastName: this.state.info.LastName,
      Title: title.value
    };

    FirebaseService.addPost(this.state.post)
    FirebaseService.getAllPosts().once("value", this.onDataChange)
    flag = false;
  }

  render() {
    const { isLoading, posts } = this.state;

    if (isLoading === true) {
      return <p>Loading...</p>
    }
    return (
      <div>
        <ButtonAppBar /><br />
        <h3 className='fitHead'>Feed</h3>
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
            const handleNoLike = async () => {
              // eslint-disable-next-line react/no-direct-mutation-state
              this.state.like = {
                UserID: userAuth.uid
              };
              console.log(item.liked)
              console.log(this.state.like)
              FirebaseService.addLike(this.state.like, item.key);
              FirebaseService.getAllPosts().once("value", this.onDataChange);
            }

            const removeLike = async () => {
              console.log(item.key);
              FirebaseService.getLike(item.key).once("value", this.onLikesPost);

              let key2 = "";
              let i;
              console.log(this.state.templist)
              for (i = 0; i < this.state.templist.length; i++) {
                if (this.state.templist[i].id === userAuth.uid) {
                  key2 = this.state.templist[i].key
                }
              }

              FirebaseService.deleteLike(item.key, key2);
              FirebaseService.getAllPosts().once("value", this.onDataChange)
            }
            const format = moment(datet).format('MMM Do');
            return <div key={item.key}>
              <div className="feedBox">
                <p className="feedUser" style={{ whiteSpace: 'nowrap' }}>{format} · {item.firstname} {item.lastname}</p>
                <p className="feedTitle">{item.title}</p>
                <p className="feedDescription">{item.description}</p>
                <p className="likeCount">{item.count}</p>
                {item.liked ? <img className="liked" src={liked} alt="like Button" onClick={removeLike} /> : <img className="liked" src={like} alt="like Button" onClick={handleNoLike} />}
              </div>
            </div>
          })}
        </div>
      </div >
    );
  }
}

export default Feed;
