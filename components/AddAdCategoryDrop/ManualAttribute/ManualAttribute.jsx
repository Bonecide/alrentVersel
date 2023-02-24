import s from "./ManualAttribute.module.scss";
import { useState,useEffect } from 'react';
export default function ManualAttribute({ attribute, setAttribute,isSaved }) {
 
  const [type,setType] = useState('text')
  const [info,setInfo] = useState( {
    manual_datatype : attribute.manual_datatype,
   
  })

  useEffect(() => {
    if(attribute.manual_datatype === 'INTEGER' || attribute.manual_datatype === 'DECIMAL') {
        setType('number')
    }
    else if ( attribute.manual_datatype ==='BOOLEAN') {
        setType('radio')
    }
  },[attribute])

  useEffect(() => {


    if(isSaved) {
        
      if (attribute.manual_datatype === 'INTEGER') {
        setAttribute(prev => [...prev,{
            attribute : attribute.id,
            integer_value: info.integer_value,
        }])
     
      }
      else {
        if (attribute.manual_datatype === 'STRING') {
            setAttribute(prev => [...prev,{
                attribute : attribute.id,
                string_value: info.string_value,
            }])
        }
        else {
            if (attribute.manual_datatype === 'DECIMAL') {
                setAttribute(prev => [...prev,{
                    attribute : attribute.id,
                    decimal_value: info.decimal_value,
                }])
                  
                 
            }
            else {
                setAttribute(prev => [...prev,{
                    attribute : attribute.id,
                    boolean_value: info.boolean_value,
                }])
            }

           
        }
    }

    }
  },[attribute.id, attribute.manual_datatype, info.boolean_value, info.decimal_value, info.integer_value, info.string_value, isSaved, setAttribute])
  const without = (e) => {
    if (attribute.manual_datatype === 'INTEGER') {
            const newValue = e.target.value.replace(/[^\d]/g, '');
            if (newValue === info.value) return;
            setInfo(prevInfo => ({
            ...prevInfo,
            integer_value: newValue
          }));
    }
    else {
        if (attribute.manual_datatype === 'STRING') {
            setInfo(prevInfo => ({
                ...prevInfo,
                string_value: e.target.value    
              }))
        }
        else {
            if (attribute.manual_datatype === 'DECIMAL') {
                setInfo(prevInfo => ({
                    ...prevInfo,
                    decimal_value: e.target.value    
                  }))
                  
                 
            }

           
        }
    }
  }

  return (
    <div className={s.container}>
      <p className={s.title}>{attribute.name}</p>
     <div className={s.info}>
      {attribute.manual_datatype ==='BOOLEAN' ? (
     <div className={s.radioContainer}>
    <div className={s.form_radio_btn}>
            <input id={`radio-1${attribute.id}`} name={attribute.id} value='1' onChange={(e) => e.target.checked && setInfo(prev => ({
                ...prev,
                boolean_value : e.target.checked ? true : undefined
            }))}  type={type} checked ={info.boolean_value === true}/>
            <label htmlFor={`radio-1${attribute.id}`}>Да</label>
    </div>
 
        <div className={s.form_radio_btn}>
            <input  id={`radio-2${attribute.id}`}  name={attribute.id} value="2"  onChange={(e) => e.target.checked && setInfo(prev => ({
                ...prev,
                boolean_value : e.target.checked ? false : undefined
            }))}  type={type} checked ={info.boolean_value === false}/>
            <label htmlFor={`radio-2${attribute.id}`}>Нет</label>
        </div>
     </div>
        
      ) : (
        <input value={info.value} onChange={without} step={attribute.manual_datatype === 'DECIMAL' ? '0.1' : (attribute.manual_datatype ==='INTEGER' ? '0' : undefined)} type={type} />
      )}
      <p>{attribute.measure.toUpperCase()}</p>
     </div>
    </div>
  );
}
