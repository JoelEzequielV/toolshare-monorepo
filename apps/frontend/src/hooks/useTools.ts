import { useEffect, useState } from 'react';
import { fetchToolsUseCase } from '../usecases/fetchToolsUseCase';
import * as api from '../services/api';


export function useTools(){
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const repo = { fetchAll: api.fetchTools };
useEffect(()=>{ (async ()=>{
try{
const fn = fetchToolsUseCase(repo);
const res = await fn();
setData(res);
}catch(e){ console.error(e) }
setLoading(false);
})() },[])
return {data, loading};
}