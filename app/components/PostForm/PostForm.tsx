import { useForm } from 'react-hook-form';

import { ComponentPropsWithoutRef, useCallback } from "react";

const PostForm = ({ method = 'post', ...props}: ComponentPropsWithoutRef<'form'>) => {
  const { trigger, register, formState: { isValid, errors } } = useForm({ mode:'all', defaultValues: {
    title: '',
    body: '',
  }})

  const onClickSubmit = useCallback((e) => {
    if (!isValid) {
      e.preventDefault();
      trigger(undefined, { shouldFocus: true})
    } 
  }, [isValid, trigger])

  return (
  <form method={method} className="flex flex-col gap-4" {...props}>
  <div className="flex flex-col">
    <label htmlFor="title" className="mb-2 text-gray-600">
      Title
    </label>
    <input className="p-4" placeholder="title" {...register('title', {required: {
      value: true,
      message: 'Title is required'
    } })} />
    {errors?.title?.message && (
      <p className="text-red-500">
      {errors.title.message}
    </p>
    )}
  </div>
  <div className="mb-4 flex flex-col">
    <label htmlFor="body" className="mb-2 text-gray-600">
      Body
    </label>
    <textarea className="p-4" placeholder="Write something amazing" {...register('body', { required: {value: true,
      message: 'Body is required'} })}/>
    {errors?.body?.message && (
      <p className="text-red-500">
      {errors.body.message}
    </p>
    )}
  </div>
  <button type="submit" className="hover:bg-slate-100 transition rounded text-blue-700 font-bold p-4" onClick={onClickSubmit} >Create post</button>
  </form>);
}

export default PostForm;