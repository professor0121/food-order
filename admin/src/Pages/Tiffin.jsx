import React from 'react'
import Layout from './Layout'
import { useSelector ,useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { getAllTiffin,createTiffin } from '@/Redux/slices/tiffinSlice';
import TiffinForm from '@/components/TiffinForm';
const Tiffin = () => {
  const dispatch = useDispatch();
  const { tiffins, loading, error } = useSelector((state) => state.tiffin);

  useEffect(() => {
    dispatch(getAllTiffin());
  }, [dispatch]);

  return (
    <Layout>
      <div className='text-2xl font-bold text-center mt-4'>
        <TiffinForm/>
      </div>
    </Layout>
  )
}

export default Tiffin