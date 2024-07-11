const Stock = (props) => {
  return (
    // <div onClick={props.func} className={props.className} style={{ "background": `${props.style}` }}></div>
    <div onClick={props.func} className={props.className}>
      <img src={props.style} alt="stock" className="object-cover w-[inherit] h-[inherit] rounded-xl" />
    </div>
  )
}

export default Stock