import hero from  '../assets/Hero.jpg'
function Hero() {

  return (
    <div className="container rounded bg-[#063262] text-white py-20 md:flex items-center justify-evenly m-auto px-4 text-center mt-8">
      <div className="w-full flex justify-center">
        <img src={hero} alt="Imagen" className="w-80 h-80 object-cover rounded-full" />
      </div>

      <div className='w-full mt-8 md:mt-0'>
        <h1 className="text-4xl font-bold mb-4">¡Bienvenidos a Shopify Sensei!</h1>
        <p className="text-lg">Este blog está dedicado a todos esos pequeños comercios que quieren aventurarse a dar el salto a la venta online.<br></br> En el encontrarás consejos o tips para tu tiendo online.</p>
      </div>
    </div>
  )
}

export default Hero
