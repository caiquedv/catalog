import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { Button, Card, CardBody, CardSubtitle } from "reactstrap"
import { ProductType } from "../pages/index"
import SuccessToast from "./SuccessToast"

type ProductCardProps = {
  product: ProductType
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [toastIsOpen, setToastIsOpen] = useState(false)
  const { id, name, imageUrl, price } = product

  return (
    <Card>
      <Link legacyBehavior href={`/products/${id}`}>
        <a>
          <Image className="card-img-top" src={imageUrl} alt="Product" height={500} width={600} />
        </a>
      </Link>

      <CardBody>
        <Link legacyBehavior href={`/products/${id}`}>
          <a>
            <h5 className="card-title" style={{ cursor: 'pointer' }}>
              {name}
            </h5>
          </a>
        </Link>

        <CardSubtitle className="mb-3 text-muted" tag="h6">
          R$ {price}
        </CardSubtitle>

        <Button
          color="dark"
          className="pb-2"
          block
          onClick={() => {
            setToastIsOpen(true)
            setTimeout(() => setToastIsOpen(false), 1000 * 3)
          }}
        >
          Adicionar ao Carrinho
        </Button>

      </CardBody>
      <SuccessToast toastIsOpen={toastIsOpen} setToastIsOpen={setToastIsOpen} />
    </Card>
  )
}

export default ProductCard
