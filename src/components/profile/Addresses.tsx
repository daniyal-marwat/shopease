import { CircleAlert, Plus, Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import { LabelInput } from "../ui/labelInput";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { addAddress, deleteAddress, updateAddress } from "@/lib/api";
import { useRouter } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card, CardContent } from "../ui/card";
import { toastMessage } from "@/lib/toastMessage";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import { useState } from "react";
import type { Address } from "@/types/address";

export default function Addresses({ addresses }: { addresses: Address[] }) {
  return (
    <div className="mt-4 shadow rounded-2xl p-4 flex flex-col gap-2">
      <div className="flex gap-4">
        <p className="text-sm font-semibold">Addresses</p>
        <AddAddressForm isDefault={addresses.length === 0} />
      </div>
      {addresses.length === 0 ? (
        <NoAddress />
      ) : (
        <div className="flex flex-col sm:flex-wrap sm:flex-row gap-4">
          {addresses.map((address, i) => (
            <Address key={i} {...address} />
          ))}
        </div>
      )}
    </div>
  );
}

function NoAddress() {
  return (
    <Card>
      <CardContent className="flex items-center gap-4">
        <CircleAlert />
        <p className="text-sm">No addresses added</p>
      </CardContent>
    </Card>
  );
}

function Address({
  first_name,
  last_name,
  address,
  city,
  zip_code,
  is_default = false,
  id,
}: Address) {
  const router = useRouter();
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [address_, setAddress_] = useState(address);
  const [city_, setCity_] = useState(city);
  const [zipCode_, setZipCode_] = useState(zip_code);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutate: updateMutate, isPending: updating } = useMutation({
    mutationFn: () =>
      updateAddress({
        first_name: firstName,
        last_name: lastName,
        address: address_,
        city: city_,
        zip_code: zipCode_,
        id,
      }),
    onSuccess: () => {
      setIsEditing(false);
      toastMessage("Address updated successfully", "accomplishment");
      router.invalidate();
    },
  });

  const { mutate: deleteMutate, isPending: deleting } = useMutation({
    mutationFn: () => deleteAddress(id),
    onSuccess: () => {
      setConfirmDelete(false);
      toastMessage("Address deleted successfully", "accomplishment");
      router.invalidate();
    },
  });

  return (
    <>
      {/* Main Card */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogTrigger asChild>
          <Card className="cursor-pointer relative">
            <CardContent>
              {is_default && (
                <p className="text-gray-500 text-sm mb-2">Default address</p>
              )}
              <p className="text-sm">{first_name + " " + last_name}</p>
              <p className="text-sm">{address}</p>
              <p className="text-sm">{city}</p>
              {zip_code && <p className="text-sm">{zip_code}</p>}

              {/* Delete button */}
              <Trash2
                size={16}
                className="absolute right-8 top-2 cursor-pointer hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete(true);
                }}
              />
              <Pencil className="absolute right-2 top-2" size={16} />
            </CardContent>
          </Card>
        </DialogTrigger>

        {/* Dialog to edit */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateMutate();
            }}
            className="flex flex-col gap-4"
          >
            <LabelInput
              label="First name"
              value={firstName}
              name="Firstname"
              onValueChange={setFirstName}
            />
            <LabelInput
              label="Last name"
              value={lastName}
              name="Lastname"
              onValueChange={setLastName}
            />
            <LabelInput
              label="Address"
              value={address_}
              name="Address"
              onValueChange={setAddress_}
            />
            <LabelInput
              label="City"
              value={city_}
              name="City"
              onValueChange={setCity_}
            />
            <LabelInput
              label="Zip code"
              value={zipCode_}
              name="Zip code"
              type="number"
              onValueChange={setZipCode_}
            />
            <Button disabled={updating}>Save</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* 🔥 AlertDialog shown ONLY when confirmDelete is true */}
      {confirmDelete && (
        <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
          <AlertDialogContent>
            {/* <DialogHeader>
              <DialogTitle>Delete Address</DialogTitle>
            </DialogHeader> */}
            <p className="text-sm">
              Are you sure you want to delete this address?
            </p>
            <div className="flex gap-2 mt-4">
              <Button
                variant="destructive"
                disabled={deleting}
                onClick={() => deleteMutate()}
              >
                Delete
              </Button>
              <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
                Cancel
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

function AddAddressForm({ isDefault = false }: { isDefault?: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address_, setAddress_] = useState("");
  const [city_, setCity_] = useState("");
  const [zipCode_, setZipCode_] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      addAddress({
        first_name: firstName,
        last_name: lastName,
        address: address_,
        city: city_,
        zip_code: zipCode_,
        is_default: isDefault,
      }),
    onSuccess: () => {
      setOpen(false);
      toastMessage("Address added successfully", "accomplishment");
      router.invalidate();
    },
  });

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="flex items-center justify-center gap-1 cursor-pointer">
            <Plus size={16} />
            <span>Add</span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
          </DialogHeader>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
            }}
          >
            <LabelInput
              label="First name"
              name="Firstname"
              className="w-full"
              required
              onValueChange={(value) => setFirstName(value)}
            />
            <LabelInput
              label="Last name"
              name="Lastname"
              required
              onValueChange={(value) => setLastName(value)}
            />
            <LabelInput
              label="Address"
              name="Address"
              required
              onValueChange={(value) => setAddress_(value)}
            />
            <LabelInput
              label="City"
              name="City"
              required
              onValueChange={(value) => setCity_(value)}
            />
            <LabelInput
              label="Zip code"
              name="Zip code"
              onValueChange={(value) => setZipCode_(value)}
              type="number"
            />
            <Button className="cursor-pointer" disabled={isPending}>
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
