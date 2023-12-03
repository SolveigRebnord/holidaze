

const NewFilter = (props) => {

  
    let max = props.max
    let min = props.min

    let setMinGuests = props.setMinGuests
    let minGuests = props.minGuests
    let priceGap = props.priceGap
    let setPriceGap = props.setPriceGap
    let Val1 = props.Val1
    let setValg1 = props.setValg1



Val1 !== '' ? props.setActiveFilter(true) : props.setActiveFilter(false)


return ( <fieldset>
    <div><button onClick={() => setValg1('')}>Nullstill</button></div>
    <div>
    Guests
            <input  checked={Val1 === ('maxGuests') ? true : false} type="radio" value={'maxGuests'} id="guests" name="filter" onClick={(e) => {setValg1(e.target.value)}}></input>
            {Val1 === 'maxGuests' && 
            <input type="number" value={minGuests} onChange={(e) => {setMinGuests(e.target.value)}} ></input>}
    </div>
    <div>
    Price
            <input type="radio" checked={Val1 === ('price') ? true : false} value={'price'} id="price" name="filter" onClick={(e) => {setValg1(e.target.value)}}></input>
            {Val1 === 'price' && 
            <div>
            <input type="range" className="relative w-full" list="values" min={min} max={max} value={priceGap} onChange={(e) => {setPriceGap(e.target.value)}} ></input>
           
            <datalist id="values" className="flex flex-row justify-between gap-20">
                <option  value={min} label={min}></option>
                <p>{priceGap}</p>
                <option value={max} label={max}></option>
            </datalist>
            </div>}
    </div> 

    </fieldset> );
}
 
export default NewFilter;