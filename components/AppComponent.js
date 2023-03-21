const Calculator = () => {
    const [guarantee, setGuarantee] = React.useState(3);
    const [shipingActive, setShipingActive] = React.useState(false);
    const [sumProducts, setSumProducts] = React.useState(0);
    const [products, setProducts] = React.useState([
        {
            name: 'Auto RC', price: 1000, amount: 0
        },
        {
            name: 'Glass Coating', price: 2000, amount: 0
        },
        {
            name: 'X-Compact Drone', price: 3000, amount: 0
        }
    ]);

    const [shipingList, setShipingList] = React.useState([
        {
            name: 'Самовивіз', price: 0, checked: true
        },
        {
            name: 'Доставка кур\'єром', price: 500, checked: false
        },
        {
            name: 'Доставка на пошту', price: 300, checked: false
        }
    ]);

    const removeItem = (item) => {
        let productsChanged = products.slice(0)
        productsChanged.forEach(element => {
            if (element === item) element.amount--;
        });
        setProducts(productsChanged);
        setSumProducts(countSum());
    }

    const addItem = (item) => {

        let productsChanged = products.slice(0)
        productsChanged.forEach(element => {
            if (element === item) element.amount++;
        });
        setProducts(productsChanged);
        setSumProducts(countSum());
    }

    const changeShiping = (item) => {
        let shipingChanged = shipingList.slice(0)
        shipingChanged.forEach(element => {
            element === item ? element.checked = true : element.checked = false;
        });
        setShipingList(shipingChanged);
        setShipingActive(false);
    }

    const countSum = () => {
        return products.reduce(
            (acc, product) =>
                acc + (product.amount * product.price), 0
        )
    }

    return (
        <div className="calculator">
            <div className="calc__check-block">
                {products ? products.map((item, i) =>
                    <div className="calc__check-item" key={i}>
                        <label className="calc__check-label">
                            <img src={"../assets/img/product-" + (i + 1) + ".jpg"} />
                            <input type="checkbox"
                                v-model="item.checked" />
                            <span className="calc__check"></span>
                            <div className="calc__check-name">{item.name}</div>
                        </label>
                        <div className="calc__check-controll">
                            <span onClick={item.amount > 0 ? () => removeItem(item) : null}>-</span>
                            <span>{item.amount}</span>
                            <span onClick={item.amount < 9 ? () => addItem(item) : null}>+</span>
                        </div>
                    </div>
                ) : ''
                }

            </div >
            <div className="calc__slider-block">
                <input type="range" min="1" max="5" value={guarantee} onChange={() => setGuarantee(event.target.value)} />
                <span>Років гарантії: {guarantee}</span>
            </div>
            <div className="calc__select">
                {shipingActive}
                <div className="__select" data-state={shipingActive ? 'active' : ''}>
                    <div className="__select__title" data-default="Option 0"
                        onClick={() => setShipingActive(!shipingActive)}>
                        {shipingList.find(element => element.checked == true).name}
                    </div>
                    <div className="__select__content">
                        {shipingList.map((item, i) =>
                            <div key={i}>
                                <input id={item.name}
                                    className="__select__input"
                                    type="radio"
                                    name="singleSelect"
                                    checked={item.checked}
                                    onChange={() => changeShiping(item)} />

                                <label htmlFor={item.name} className="__select__label">{item.name}</label>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="calc__final">
                <div className="calc__price">
                    Ціна: ${sumProducts != 0 ? guarantee * 100
                        + shipingList.find(element => element.checked == true).price
                        + sumProducts : 0}
                </div>
                <div className="calc__button btn">Замовити</div>
            </div>
        </div >
    );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Calculator />);
