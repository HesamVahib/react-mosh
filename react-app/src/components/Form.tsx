import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  description: z.string().min(3, { message: 'Description should be at least 3 characters.'}),
  amount: z.coerce.number({ invalid_type_error: 'Amount is number required'}).min(1, { message: 'Amount should be greater than 0'}),
  category: z.string().min(1, { message: 'Category is required.'})
})

type FormData = z.infer<typeof schema>

interface TableDataProps {
  expenses: FormData[]
  categoryChange?: string | null
  buttonDeleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const TableData = ({expenses, buttonDeleteClick, categoryChange}: TableDataProps) => {

  const tableItems = expenses.map((expense, index) => {
    if (categoryChange && categoryChange !== expense.category) {
      return null
    } else {
      return (
        <tr key={index}>
          <td>{expense.description}</td>
          <td>{expense.amount}</td>
          <td>{expense.category}</td>
          <td>
            <button data-index={index} 
                    onClick={buttonDeleteClick} className="btn btn-danger">Delete</button>
          </td>
        </tr>
      )
    }
  })

  return (
    <table className="table table-bordered mt-3">
      <thead>
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Amount</th>
          <th scope="col">Category</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {tableItems}
      </tbody>
    </table>
  )
}

interface FilterCategoryProps {
  setCategoryChange: (category: string) => void
}

const FilterCategory = ({setCategoryChange}: FilterCategoryProps) => {

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    setCategoryChange(e.target.value)
  }

  return (
    <div className="mt-5">
      <select id="category" className="form-select" onChange={handleCategoryChange} >
        <option value="">--Select Category--</option>
        <option value="groceries">Groceries</option>
        <option value="utilities">Utilities</option>
        <option value="entertainement">Entertainement</option>
      </select>
    </div>
  )
}


const Forms = () => {
  const { register, handleSubmit, formState: {errors}, reset } = useForm<FormData>({ resolver : zodResolver(schema) })
  const [expenses, setExpenses] = useState<FormData[]>([])
  const [categoryChange, setCategoryChange] = useState<string | null>(null)

  const onSubmit = (data: FormData) => {
    setExpenses((prevExpenses) => [...prevExpenses, data])
    console.log(data)
    reset();
  }

  const buttonDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => { 
    console.log(e.currentTarget.dataset.index)
    const index = parseInt(e.currentTarget.dataset.index || "-1", 10);
    if (index >= 0) {
      setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index))
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>  
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Description</label>
            <input {...register('description')}
              id="description" type="text" className="form-control" />
            {errors.description && <p className='text-danger'>{errors.description.message}</p>}
        </div>
        
        <div className="mb-3">
            <label htmlFor="number" className="form-label">Amount</label>
            <input { ...register('amount', { valueAsNumber: true }) }
              id="amount" type="number" className="form-control" />
            {errors.amount && <p className='text-danger'>{errors.amount.message}</p>}
        </div>

        <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select { ...register('category') }
              id="category" className="form-select" >
                <option value="">--Select Category--</option>
                <option value="groceries">Groceries</option>
                <option value="utilities">Utilities</option>
                <option value="entertainement">Entertainement</option>
            </select>
        </div>
        <button className="btn btn-primary" type='submit'>Submit</button>
        <br />
    </form>
    <FilterCategory setCategoryChange={setCategoryChange} />
    <TableData categoryChange={categoryChange} expenses={expenses} buttonDeleteClick={buttonDeleteClick} />
  </>
  )
}


export default Forms