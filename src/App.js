import React, { useState, useEffect } from "react";
import {
	FaEnvelopeOpen,
	FaUser,
	FaCalendarTimes,
	FaMap,
	FaPhone,
	FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [label, setLabel] = useState("name");
	const [value, setValue] = useState("random user");

	const fetchAPI = async (url) => {
		try {
			const response = await fetch(url);
			const userData = await response.json();
			const { name, email, dob, location, phone, login, picture } =
				userData.results[0];
			const newUser = {
				name: name.first + " " + name.last,
				email,
				age: dob.age,
				street: location.street.number + " " + location.street.name,
				phone,
				password: login.password,
				picture: picture.large,
			};
			setUser(newUser);
			setValue(newUser.name);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleMouseOver = (e) => {
		const targetLabel = e.target.getAttribute("data-label");
		if (targetLabel !== null) {
			setLabel(targetLabel);
			setValue(user[targetLabel]);
		}
	};

	useEffect(() => {
		fetchAPI(url);
	}, []);

	return (
		<main>
			<div className="block bcg-black"></div>
			<div className="block">
				<div className="container">
					<img
						src={user === null ? defaultImage : user.picture}
						alt="random user"
						className="user-img"
					/>
					<p className="user-title">{label && `my ${label} is`}</p>
					<p className="user-value">{value}</p>
					<div className="values-list">
						<button
							className="icon"
							data-label="name"
							onMouseEnter={handleMouseOver}
						>
							<FaUser />
						</button>
						<button
							className="icon"
							data-label="email"
							onMouseEnter={handleMouseOver}
						>
							<FaEnvelopeOpen />
						</button>
						<button
							className="icon"
							data-label="age"
							onMouseEnter={handleMouseOver}
						>
							<FaCalendarTimes />
						</button>
						<button
							className="icon"
							data-label="street"
							onMouseEnter={handleMouseOver}
						>
							<FaMap />
						</button>
						<button
							className="icon"
							data-label="phone"
							onMouseEnter={handleMouseOver}
						>
							<FaPhone />
						</button>
						<button
							className="icon"
							data-label="password"
							onMouseEnter={handleMouseOver}
						>
							<FaLock />
						</button>
					</div>
					<button
						className="btn"
						type="button"
						onClick={() => fetchAPI(url)}
					>
						{loading ? "...loading" : "random user"}
					</button>
				</div>
			</div>
		</main>
	);
}

export default App;
