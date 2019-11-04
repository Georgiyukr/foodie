import React, { Component, useRef, useEffect } from "react";

// import axios from "axios";

// function useHover() {
//   const ref = useRef();
//   const [hovered, setHovered] = useState(false);

//   const enter = () => setHovered(true);
//   const leave = () => setHovered(false);
//   useEffect(() => {
//     ref.current.addEventListener("mouseenter", enter);
//     ref.current.addEventListener("mouseleave", leave);
//     return () => {
//       ref.current.removeEventListener("mouseenter", enter);
//       ref.current.removeEventListener("mouseleave", leave);
//     };
//   }, [ref]);
//   return [ref, hovered];
// }
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      loginHover: false,
      submitHover: false,
      creditCardNumber: "",
      securityCode: ""
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, event) {
    this.setState({ [key]: event.target.value });
  }

  toggleHover(hover, current) {
    this.setState({ [hover]: !current });
  }

  //register a user
  register() {
    if (
      !this.state.username ||
      !this.state.password ||
      !this.state.name ||
      !this.state.creditCardNumber ||
      !this.state.securityCode
    ) {
      alert("Please make sure all the fields are filled!");
      return;
    }

    fetch("http://localhost:8080/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      redirect: "follow",
      body: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
        creditCardNumber: this.state.creditCardNumber,
        securityCode: this.state.securityCode
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success === true && responseJson.user) {
          console.log("USER REGISTERED", responseJson.user);
          this.setState({ name: "", username: "", password: "" });
          this.props.history.push("/login");
        }
      })
      .catch(err => {
        console.log("ERROR in FETCH /REGISTER", err);
      });
  }

  onSubmit(event) {
    event.preventDefault();
    this.register();
  }

  render() {
    // const [ref, hovered] = useHover();

    let loginStyle;
    if (this.state.loginHover) {
      loginStyle = styles.loginLink;
    } else {
      loginStyle = styles.loginLink;
    }

    let submit;
    if (this.state.submitHover) {
      submit = {
        backgroundColor: "#3b8e39",
        width: "7%",
        color: "white",
        border: "none",
        fontWeight: "bold",
        fontSize: 18,
        outline: "none"
      };
    } else {
      submit = {
        backgroundColor: "#4EB94B",
        width: "7%",
        color: "white",
        border: "none",
        fontWeight: "bold",
        fontSize: 18,
        outline: "none"
      };
    }

    return (
      <div>
        <div style={styles.navBar}>
          <p1 style={styles.logo}>Foodie</p1>
          <a
            style={loginStyle}
            onMouseEnter={() =>
              this.toggleHover("loginHover", this.state.loginHover)
            }
            onMouseLeave={() =>
              this.toggleHover("loginHover", this.state.loginHover)
            }
            href="/login"
          >
            Login
          </a>
        </div>
        <div style={styles.form}>
          <h1 style={styles.register}>Registration</h1>
          <form onSubmit={event => this.onSubmit(event)}>
            <p>{/* <p>Name:</p> */}</p>
            <p>
              <input
                style={styles.input}
                type="text"
                value={this.state.name}
                onChange={event => this.handleChange("name", event)}
                placeholder="enter your name ..."
              />
            </p>
            {/* <p>Username:</p> */}
            <p>
              <input
                style={styles.input}
                type="text"
                value={this.state.username}
                onChange={event => this.handleChange("username", event)}
                placeholder="enter your username ..."
              />
            </p>
            {/* <p>Password:</p> */}
            <p>
              <input
                style={styles.input}
                type="password"
                value={this.state.password}
                onChange={event => this.handleChange("password", event)}
                placeholder="enter your password ..."
              />
            </p>
            <p>
              <input
                style={styles.input}
                type="text"
                value={this.state.creditCardNumber}
                onChange={event => this.handleChange("creditCardNumber", event)}
                placeholder="enter your credit card number ..."
              />
            </p>
            <p>
              <input
                style={styles.input}
                type="text"
                value={this.state.securityCode}
                onChange={event => this.handleChange("securityCode", event)}
                placeholder="enter your security number ..."
              />
            </p>
            <p>
              <input
                style={submit}
                onMouseEnter={() =>
                  this.toggleHover("submitHover", this.state.submitHover)
                }
                onMouseLeave={() =>
                  this.toggleHover("submitHover", this.state.submitHover)
                }
                type="submit"
                value={"Submit"}
              />
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const styles = {
  navBar: {
    backgroundColor: "#4EB94B",
    width: "100%",
    height: "50px",
    boxShadow: "0 0 5px #000"
  },

  loginLink: {
    color: "white",
    float: "right",
    marginRight: "50px",
    marginTop: "10px",
    fontWeight: "bold",
    fontSize: "18px",
    textDecoration: "none"
  },

  logo: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
    marginLeft: "50px"
  },

  form: {
    textAlign: "center",
    marginTop: "3%",
    display: "block"
  },
  register: {
    color: "#494949",
    marginBottom: "2%"
  },
  input: {
    width: "19%",
    border: "none",
    borderBottom: "solid",
    borderColor: "#4EB94B",
    outline: "none",
    marginBottom: "0.8%"
  }
};

export default Register;
