import { useParams } from "react-router-dom";

const product = {
  id: 1,
  name: "Remera básica",
  price: 16000,
  image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
};

export const ProductPage = () => {
  const { id } = useParams();

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex gap-6">
          <img 
            src={product.image} 
            alt={product.name}
            className="flex-1 h-[100px] object-cover sm:h-[450px]"
          />
          <div className="flex-1 flex flex-col gap-4">
            <header>
              <h2>
                {product.name}
              </h2>

              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
                praesentium cumque iure dicta incidunt est ipsam, officia dolor
                fugit natus?
              </p>
            </header>

            <div className="flex justify-between items-center">
              <p>${product.price}</p>
              <button>
                + Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};