import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { validateFormAddProperty } from "../../utilities/validateForm"
import MapForm from "./mapContainer"
import { getAllCategories, getAllServices } from "../../redux/actions"
import {
  ButtonSt,
  Container,
  ContainerImgAndMap,
  ContainerMap,
  FormContainer,
  InputSt,
  LabelSt,
  TextDescription,
  TitleSt,
} from "./styles"
import { SelectSt } from "../Filters/styles/index.sort"
import axios from "axios"

// volejap676@jo6s.com
// Cheboludo$1

export default function FormAddProperty() {
  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllServices())
  }, [])
  const dispatch = useDispatch()
  const typeProperty = useSelector(state => state.categories)
  const servicesData = useSelector(state => state.services)
  const coordinates = useSelector(state => state.coordinates)

  // data
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    numberOfRooms: 0,
    image: [],
    services: [],
    description: "",
    discount: 0,
    typePropertyID: "",
    coordinates: [],
    userID: "b49a5948-21a0-44c3-92fc-20b626d94dc2",
  })
  // errors
  const [errors, setErrors] = useState({})
  useEffect(() => {
    setErrors(validateFormAddProperty(formData))
  }, [formData])

  const handleInputChange = e =>
    setFormData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  const [service, setService] = useState("")
  const addService = e => {
    e.preventDefault()
    if (formData.services.includes(e.target.value)) return
    setFormData(prev => {
      return {
        ...prev,
        services: [...formData.services, service],
      }
    })
    setService("")
  }
  const api = import.meta.VITE_APP_API_URL
  const sendData = async e => {
    e.preventDefault()
    await axios
      .post(`${api}/properties/addProperty`, { ...formData })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    if (coordinates[0] === undefined) return
    setFormData(prev => {
      return {
        ...prev,
        coordinates: coordinates,
      }
    })
  }, [coordinates])

  const [fileState, setFileState] = useState("")
  const handleFileChange = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "rentApp")
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dye9d3vzy/image/upload",
      {
        method: "POST",
        body: data,
      },
    )
    const file = await res.json()
    setFileState(file.secure_url)
  }

  return (
    <>
      <TitleSt>
        <h1>Add Property</h1>
      </TitleSt>
      <Container>
        <FormContainer>
          <LabelSt>Name</LabelSt>
          <InputSt
            name="name"
            value={formData.name}
            type={"text"}
            onChange={handleInputChange}
          />
          {errors.name && <LabelSt error={true}>{errors.name}</LabelSt>}

          <LabelSt>Location</LabelSt>
          <InputSt
            type={"text"}
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
          {errors.location && <LabelSt error={true}>{errors.location}</LabelSt>}
          <LabelSt>Price</LabelSt>
          <InputSt
            type={"number"}
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          {errors.price && <LabelSt error={true}>{errors.price}</LabelSt>}

          <LabelSt>Number of rooms</LabelSt>
          <input
            type="range"
            max="10"
            min="1"
            step="1"
            style={{ width: "40%" }}
            name="numberOfRooms"
            value={formData.numberOfRooms}
            onChange={handleInputChange}
          />
          <label>{formData.numberOfRooms}</label>

          <LabelSt>Description</LabelSt>
          <TextDescription
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <LabelSt error={true}>{errors.description}</LabelSt>
          )}

          <LabelSt>Discount</LabelSt>
          <input
            type="range"
            max="30"
            min="0"
            step="5"
            style={{ width: "40%" }}
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
          />
          <label>{formData.discount} %</label>
          {errors.discount && <LabelSt error={true}>{errors.discount}</LabelSt>}
        </FormContainer>
        <ContainerImgAndMap>
          <div>
            {errors.coordinates ? (
              <LabelSt error={true}>{errors.coordinates}</LabelSt>
            ) : (
              <>
                <LabelSt>Coordinates </LabelSt>
                <LabelSt>{coordinates} </LabelSt>
              </>
            )}
          </div>
          <ContainerMap>
            <MapForm />
          </ContainerMap>

          <FormContainer>
            <LabelSt>Images</LabelSt>
            <img
              src={fileState}
              style={{ width: "30%", height: "30%" }}
              alt="not found"
            />
            <input type="file" name="file" onChange={handleFileChange} />

            <LabelSt>Type of property</LabelSt>
            <SelectSt name="typePropertyID" onChange={handleInputChange}>
              <option></option>
              {typeProperty &&
                typeProperty.map(e => (
                  <option value={e.id} key={e.id}>
                    {e.name}
                  </option>
                ))}
            </SelectSt>

            {errors.typePropertyID && (
              <LabelSt error={true}>{errors.typePropertyID}</LabelSt>
            )}
          </FormContainer>
          <FormContainer>
            <LabelSt>Services</LabelSt>
            {servicesData &&
              servicesData.map((elem, index) => (
                <label key={index}>
                  <input type="checkbox" id={elem.id} value={elem.id} />
                  {elem.name}
                </label>
              ))}
            <SelectSt onChange={e => setService(e.target.value)}>
              <option></option>
              {servicesData &&
                servicesData.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
            </SelectSt>
            {errors.services && (
              <LabelSt error={true}>{errors.services}</LabelSt>
            )}
            <ButtonSt onClick={addService}>add</ButtonSt>
          </FormContainer>
        </ContainerImgAndMap>
      </Container>
      <TitleSt>
        <ButtonSt
          disabled={
            errors.name ||
            errors.location ||
            errors.price ||
            errors.maxNumberOfPeople ||
            errors.numberOfRooms ||
            errors.description ||
            errors.typePropertyID ||
            errors.floor ||
            errors.coordinates ||
            errors.services
          }
          onClick={sendData}>
          ADD PROPERTY
        </ButtonSt>
      </TitleSt>
    </>
  )
}
