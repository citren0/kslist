import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch } from "./store/store";
import useAppSetup from "./services/hooks/useAppSetup";
import { Card, NavBar, SimpleInput } from "./components";
import productsSelectors from "./store/products-slice/selectors";
import { decrementPage, getProducts, incrementPage } from "./store/products-slice/thunks";
import AsyncThunkStatus from "./enums/AsyncThunkStatus";
import search_image from "../assets/search.svg";
import loader_black_image from "../assets/loader-black.svg";


const App = () =>
{
	const dispatch = useDispatch<AppDispatch>();

	const products = useSelector(productsSelectors.selectProducts);
	const isLoading = useSelector(productsSelectors.selectGetProductsThunkStatus).thunkStatus == AsyncThunkStatus.Pending;

	const allPossibleAllergens = [ "wheat", "rice", "tomato", "vanilla", "milk", "dairy", "gluten", "peanuts", "tree nuts", "soy", "oat" ];

	const [ allergens, setAllergens ] = useState<string[]>([]);

	const { appSetup } = useAppSetup();

	const [ query, setQuery ] = useState<string>("");

	useEffect(() =>
	{
		appSetup();
		document.documentElement.className = "light";
	}, []);

	return (
	<>
		<NavBar />
		<div className="content-layout">
			<div className="flex-center align-self-center gap-1">
				<span className="home-explanation">Enter allergens or ingredients you would like to avoid, and then type what you're searching for.</span>
				
				<div className="flex-center-row" style={{gap: "0 2rem"}}>
					{ allPossibleAllergens.map((allergen) => {
						return (<>
							<div className="check-item" key={allergen}>
								<input type="checkbox" id={allergen} name={allergen} value={allergen} onClick={() => {
									if (allergens.includes(allergen))
									{
										setAllergens(allergens.filter((element: string) => element != allergen));
									}
									else
									{
										setAllergens(allergens.concat([allergen]));
									}
								}}/>
								<label htmlFor={allergen}>{allergen}</label>
							</div>
						</>);
					}) }
				</div>

				<form
					onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); dispatch(getProducts(query, allergens)); }}
					className="flex-center-row"
					style={{gap: "0.5rem 1.25rem"}}
				>
					<SimpleInput
						image={search_image}
						onChange={(e: React.FormEvent<HTMLInputElement>) => setQuery(e.currentTarget.value)}
						type="text"
					/>
					<button className="btn-prominent-small">Search</button>
				</form>

				<div className="product-list">
					
					{ isLoading && <>
						<img src={loader_black_image} height={48} className="spinner" />
					</> }

					{ products.map((product) =>
						{
							return <>
								<Card
									image_url={product.image}
									link_url={product.link}
									name={product.name}
									okay={product.okay}
									key={product.link}
								/>
							</>;
						})
					}

					{ products.length == 0 && !isLoading && <>
						<h3>No products found.</h3>
					</> }
				</div>
				{ products.length != 0 && !isLoading && <>
					<div className="flex-center-row">
						<button className="btn-prominent-small" onClick={() => {
							dispatch(decrementPage());
							dispatch(getProducts(query, allergens));
						}}>Previous Page</button>
						<button className="btn-prominent-small" onClick={() => {
							dispatch(incrementPage());
							dispatch(getProducts(query, allergens));
						}}>Next Page</button>
					</div>
				</> }
			</div>
		</div>
	</>
	)
}

export default App;
