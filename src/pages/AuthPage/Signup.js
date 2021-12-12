import React, { useState } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  doc,
  db,
  setDoc,
} from "../../shared/configs/firebase";
import { Spin, message, Input, Checkbox, Tag } from "antd";
import {
  UserOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [affiliations, setAffiliations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAffiliation = (e) => {
    if (e.target.value[e.target.value.length - 1] === ",") {
      // console.log("naay comma");
      affiliations.push({
        title: e.target.value.slice(0, e.target.value.length - 1),
      });
      setAffiliation("");
    } else {
      setAffiliation(e.target.value);
    }
  };

  const removeAffiliation = (value) => {
    const result = affiliations.filter((item) => item.title !== value);
    setAffiliations(result);
  };

  const register = (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setDoc(doc(db, "dieticians", user.uid), {
          firstname,
          lastname,
          age,
          jobTitle,
          gender,
          email,
          trainings: affiliations,
        })
          .then((res) => {
            setLoading(false);
          })
          .catch((error) => {
            message.error(error.message);
            setLoading(false);
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        message.error(error.message);
        setLoading(false);
        // ..
      });
  };
  return (
    <div className="mt-8">
      <form onSubmit={register}>
        <div className="flex flex-col space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor="email">Firstname</label>
              <Input
                size="large"
                width={100}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="email">Lastname</label>
              <Input
                size="large"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor="email">Age</label>
              <Input
                size="large"
                width={100}
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="email">Job Title</label>
              <Input
                size="large"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label>Gender</label>
            <div className="flex gap-2">
              <Checkbox
                checked={gender === "male"}
                onChange={() => setGender("male")}
              >
                Male
              </Checkbox>
              <Checkbox
                checked={gender === "female"}
                onChange={() => setGender("female")}
              >
                Female
              </Checkbox>
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            {affiliations.map((item) => (
              <Tag
                key={item.title}
                color="success"
                closable
                onClose={() => removeAffiliation(item.title)}
              >
                {item.title}
              </Tag>
            ))}
          </div>
          <div>
            <label htmlFor="email">Affiliations</label>
            <Input
              size="large"
              type="text"
              value={affiliation}
              onChange={handleAffiliation}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              size="large"
              prefix={<MailOutlined />}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary rounded-full text-white w-full py-3 mt-4 font-semibold shadow-md"
        >
          {loading ? <Spin /> : "LOGIN"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
