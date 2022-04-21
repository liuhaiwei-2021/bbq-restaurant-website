import { useParams, useNavigate } from "react-router-dom";
import { getCollection } from "../scripts/fireStore";
import { useEffect, useState } from "react";
import DishCard from "../components/DishCard";
import Loader from "../scripts/Loader";
import "../styles/Category.css";

function Category() {
	const { id } = useParams();
	const category = id;

	// Local state
	const [dishes, setDishes] = useState([]);
	const [status, setStatus] = useState(0);

	useEffect(() => {
		async function loadData() {
			const data = await getCollection(`categories/${id}/content`);
			setDishes(data);
			setStatus(1);
		}
		loadData();
	}, []);

	// Safeguard
	if (status === 0) return <Loader />;

	const Dishes = dishes.map((dish, index) => (
		<DishCard key={index} dish={dish} category={category} />
	));

	return (
		<div className="category">
			<h1 className="category-title">{id}</h1>
			<div className="dish-group">{Dishes}</div>
		</div>
	);
}

export default Category;
