const EnterQuantity = ({ qty, setQuantity }) => {
  return (
    <div className="qty-input">
      <button className="qty-decrement" type="button" onClick={() => (setQuantity(qty - 1))} >
        <i className="fal fa-minus"></i>
      </button>

      <input
        id="quantity"
        type="text"
        value={qty}
        onChange={(e) => setQuantity(e.target.value)}
        min={1}
        max={20}
      />
      <button
        className="qty-increment"
        type="button"
        onClick={() => setQuantity(parseInt(qty) + 1)}
      >
        <i className="fal fa-plus"></i>
      </button>
    </div>
  );
};

export default EnterQuantity;