import React from 'react'
import Layout from './Layout'
import MealForm from '@/components/MealForm'
const Meal = () => {
  return (
    <Layout>
        <div className='text-2xl font-bold text-center mt-4'>
            <MealForm />
        </div>
    </Layout>
  )
}

export default Meal