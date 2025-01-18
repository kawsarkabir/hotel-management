 

const BannerTitle = ({heading, description}) => {
    return (
        <div>
            <div>
                <h4 className="text-3xl font-semibold text-white text-center">{heading}</h4>
                <p className="text-md md:w-1/2 mx-auto text-center text-white mt-5">{description}</p>
            </div>
        </div>
    );
};

export default BannerTitle;