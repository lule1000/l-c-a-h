const Footer = () => {
    return (
        <div className="bg-dark p-3">
            <form className="form-control bg-ligth d-flex justify-content-center">
                <input className="w-25" placeholder="Suscribe to our newsletter" type="text" />
                <button className="ms-2 bg-dark text-white bgHover rounded" type="submit">Suscribe</button>
            </form>
        </div>
    );
}

export default Footer;