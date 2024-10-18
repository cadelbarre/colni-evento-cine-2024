export default function SkeletonTable (): JSX.Element {
  return (
    <div className='animate-pulse grid grid-cols-5 gap-x-4 mt-20'>
      {
       Array.from({ length: 5 }).map((_, index) => {
         return (
           <div className='space-y-2' key={index}>
             <div className='h-10 w-18 rounded-xl bg-blue-600 mb-4' />
             <div className='h-5 w-18 rounded-md bg-gray-100 block' />
             <div className='h-5 w-18 rounded-md bg-gray-100 block' />
             <div className='h-5 w-18 rounded-md bg-gray-100 block' />
             <div className='h-5 w-18 rounded-md bg-gray-100 block' />
             <div className='h-5 w-18 rounded-md bg-gray-100 block' />
           </div>
         )
       })
     }
    </div>
  )
}
