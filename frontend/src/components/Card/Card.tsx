
import "./Card.css";
import thumbs_blue_image from "../../../assets/thumbs-up-filled-blue.svg";
import thumbs_red_image from "../../../assets/thumbs-up-filled-red.svg";


interface Props
{
    image_url: string;
    link_url: string;
    name: string;
    okay: boolean;
};

const Card = ({ image_url, link_url, name, okay }: Props) =>
{
    return (
        <>
            <a href={ link_url } target="_blank" rel="noopener noreferrer">
                <div className="card-product">
                    <img src={ image_url } height={256} className="card-image" />
                    <div className="card-text">
                        <span className="card-name">{ name }</span>
                        { (okay == true && <>
                            <div className="flex-center">
                                <img src={thumbs_blue_image} height={64} />
                                <p className="text-good">Okay, double check ingredients.</p>
                            </div>
                        </>) || <>
                            <div className="flex-center">
                                <img src={thumbs_red_image} height={64} style={{ rotate: "180deg", }} />
                                <p className="text-bad">Do not eat!</p>
                            </div>
                        </> }
                    </div>
                </div>
            </a>
        </>
    );
};

export default Card;