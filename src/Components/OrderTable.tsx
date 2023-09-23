import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../data";
import { AiOutlinePrinter } from "react-icons/ai";
import { addtoCart, editCart, updateStatus } from "../data/lib/Slices/Reeco";
import EditProductForm from "./EditProductForm";
import CancelModal from "./CancelModal";
import { tableHeader } from "../Constants";
import AddForm from "./AddForm";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  width: 80%;
  margin: 0 auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f0f0f0;
  text-align: center;
`;

const TableHeaderRow = styled.tr``;

const TableCellHeader = styled.th`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  background-color: #f9f9f9;
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: center;
`;

const SearchBox = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 20%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
`;

const AddButton = styled.button`
  padding: 5px 10px;
  background-color: #fffefe;
  color: black;
  border-radius: 50px;
  cursor: pointer;
  border: 2px solid #1f633e;
`;
const PrintIcon = styled(AiOutlinePrinter)`
  font-size: 24px;
  padding: 5px 10px;
  color: #333;
  cursor: pointer;
  margin-left: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  margin: 0 10px 0 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #fffefe;
  color: black;

  &.approve {
    background-color: #1f633e;
    color: white;
  }

  &.cancel {
    background-color: #ff6b6b;
    color: white;
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "green";
    case "Missing-Urgent":
      return "red";
    case "Missing":
      return "orange";
    default:
      return "none";
  }
};

const StatusCell = styled.td<{ status: string }>`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: center;
  color: ${(props) => getStatusColor(props.status)};
`;

const OrderTable = () => {
  const { cartList, OrderApproval_status } = useAppSelector(
    (state: RootState) => state.ReecoDetails
  );
  const dispatch = useAppDispatch();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [editModalOpen, setIsEditModalOpen] = useState(false);
  const [addModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    productName: "",
    brand: "",
    price: "",
    quantity: "",
    status: "",
    image: "",
    reason: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const filteredCartList = cartList.filter((item: any) => {
    const searchValue = searchInput.toLowerCase();
    return item.productName.toLowerCase().includes(searchValue);
  });

  const openCancelModal = (item: any) => {
    setSelectedItem(item);
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };
  const handleStatusChange = (status: string) => {
    dispatch(updateStatus({ selectedItem, status }));
    closeCancelModal();
  };
  const onClickApprove = (item: any) => {
    const status = "Approved";

    dispatch(updateStatus({ selectedItem: item, status }));
  };
  const renderRow = () => {
    return filteredCartList.map(
      (
        item: {
          id: number;
          productName: string;
          brand: string;
          price: string | any;
          quantity: string | any;
          status: string;
          image: string;
          reason: string;
        },
        index: any
      ) => (
        <TableRow key={index + item.id}>
          <TableCell>
            <img
              src={item.image}
              alt={item.productName}
              style={{ width: "100px", height: "100px" }}
            />
          </TableCell>
          <TableCell>{item.productName}</TableCell>
          <TableCell>{item.brand}</TableCell>
          <TableCell>₹{item.price}</TableCell>
          <TableCell>{item.quantity}</TableCell>
          <TableCell>₹{(item.price * item.quantity).toFixed(2)}</TableCell>
          <StatusCell status={item.status}>{item.status || ""}</StatusCell>
          <TableCell>
            <Button
              className="approve"
              onClick={() => {
                if (!OrderApproval_status) {
                  onClickApprove(item);
                } else alert("Order Already Approved");
              }}
            >
              Approve
            </Button>
            <Button
              className="cancel"
              onClick={() => {
                if (!OrderApproval_status) {
                  openCancelModal(item);
                } else alert("Order Already Approved");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!OrderApproval_status) {
                  setSelectedItem(item);
                  setIsEditModalOpen(true);
                } else alert("Order Already Approved");
              }}
            >
              Edit
            </Button>
          </TableCell>
        </TableRow>
      )
    );
  };

  return (
    <TableContainer>
      <ButtonContainer>
        <SearchBox
          type="text"
          placeholder="Search By Product Name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <Buttons>
          <AddButton
            onClick={() => {
              if (!OrderApproval_status) {
                setIsAddModalOpen(true);
              } else alert("Order Already Approved");
            }}
          >
            Add Item
          </AddButton>
          <PrintIcon />
        </Buttons>
      </ButtonContainer>
      <Table>
        <TableHeader>
          <TableHeaderRow>
            {tableHeader.map((header) => (
              <TableCellHeader>{header}</TableCellHeader>
            ))}
          </TableHeaderRow>
        </TableHeader>
        <TableBody>{renderRow()}</TableBody>
      </Table>
      {isCancelModalOpen && (
        <CancelModal
          product={selectedItem}
          onClick={handleStatusChange}
          onClose={closeCancelModal}
        />
      )}
      {editModalOpen && (
        <EditProductForm
          product={selectedItem}
          onSave={(editedProduct: any) => {
            dispatch(editCart(editedProduct));
            setIsEditModalOpen(false);
          }}
          onCancel={() => setIsEditModalOpen(false)}
        />
      )}
      {addModalOpen && (
        <AddForm
          onAdd={(product: any) => {
            dispatch(addtoCart(product));
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      )}
    </TableContainer>
  );
};

export default OrderTable;
