export default function Button( {text, onBtnClick} ) {
  return (
    <button className="button" onClick={onBtnClick}>
      {text}
    </button>
  );
}