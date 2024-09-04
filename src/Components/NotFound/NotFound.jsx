import errMsg from '../../assets/404-error-template-with-forest-night/no data.jpg'
export default function NotFound() {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-[#011F41]">
        <img src={errMsg} alt="error Message" className="w-[500px]" />
      </div>
    </>
  );
}
