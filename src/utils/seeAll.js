import { Link } from 'react-router-dom';

export const SeeAll = (props) =>{
    return (
        <Link to={`products?block=${props.linkTo}`} onClick={window.scroll(0,0)} className="see-all-view">
            <div className="see-all">
                <span>See All</span>
            </div>
        </Link>
    )
}