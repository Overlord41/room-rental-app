import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actionChangePage } from "../../redux/actions"
import { ContainerPaginated, ButtonPage, LabelPage, OutOf } from "./styles"

export default function Paginated() {
  const totalPages = useSelector(state => state.AllProperties.totalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const filters = useSelector(state => state.filters)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionChangePage(currentPage))
  }, [currentPage])
  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  return (
    <ContainerPaginated>
      <ButtonPage
        left={"1px solid #2b2929"}
        radius={"3px 0px 0px 3px"}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage <= 1}>
        {"<"} &nbsp;&nbsp;Prev
      </ButtonPage>
      {totalPages < 1 ? null : (
        <>
          <LabelPage decoration={"underline"} border={"1px solid #2b2929;"}>
            {" "}
            {currentPage}{" "}
          </LabelPage>
          <OutOf border={"1px solid #2b2929;"}>out of</OutOf>
          <LabelPage border={"1px solid #2b2929;"}> {totalPages}</LabelPage>
        </>
      )}
      <ButtonPage
        right={"1px solid #2b2929"}
        radius={"0px 3px 3px 0px"}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= totalPages}>
        Next&nbsp;&nbsp; {" >"}
      </ButtonPage>
    </ContainerPaginated>
  )
}