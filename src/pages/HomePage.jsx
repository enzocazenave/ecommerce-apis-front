import { ProductList } from "../components";

const products = [
  {
    id: 1,
    name: "Remera Básica",
    price: 16250,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 2,
    name: "Remera Básica",
    price: 16250,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 3,
    name: "Remera Básica",
    price: 16250,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 4,
    name: "Remera Básica",
    price: 16250,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
];

export const HomePage = () => {
  return (
    <section>
      <ProductList 
        products={products} 
        title="Remeras"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, illo! Facilis quia eius dignissimos, recusandae nostrum sit quisquam enim molestiae culpa, alias error non omnis, dolore repellat esse quidem. Eius."
      />

      <ProductList 
        products={products} 
        title="Camperas"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, illo! Facilis quia eius dignissimos, recusandae nostrum sit quisquam enim molestiae culpa, alias error non omnis, dolore repellat esse quidem. Eius."
      />
    </section>
  );
};
