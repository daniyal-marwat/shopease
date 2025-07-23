import { CircleAlert, Plus, Trash2 } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { Pencil } from "lucide-react";
import { LabelInput } from "../ui/labelInput";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { addAddress, deleteAddress, updateAddress } from "@/lib/api";
import { useRouter } from "@tanstack/react-router";

export interface Address {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  zip_code?: string;
  is_default?: boolean;
  id: number;
}

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

const editContext = createContext<{
  setIsEditing: (value: boolean) => void;
} | null>(null);

function NoAddress() {
  return (
    <div className="bg-gray-100 p-4 rounded flex items-center gap-4 border">
      <CircleAlert />
      <p className="text-sm">No addresses added</p>
    </div>
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
  const [isEditing, setIsEditing] = useState(false);
  return (
    <editContext.Provider value={{ setIsEditing }}>
      <div>
        <div
          onClick={() => setIsEditing(!isEditing)}
          className="p-4 rounded max-w-xs min-w-[200px] flex items-center gap-4 hover:bg-gray-100 transition cursor-pointer relative"
        >
          <div className="font-2">
            {is_default && (
              <p className="text-gray-500 text-sm mb-2">Default address</p>
            )}

            <p className="text-sm">{first_name + " " + last_name}</p>
            <p className="text-sm">{address}</p>
            <p className="text-sm">{city}</p>
            {zip_code && <p className="text-sm">{zip_code}</p>}
          </div>
          <DeleteAddressForm className="absolute right-8 top-2" id={id} />
          <Pencil className="absolute right-2 top-2" size={16} />
        </div>
        {isEditing && (
          <EditAddressForm
            first_name={first_name}
            last_name={last_name}
            address={address}
            city={city}
            zip_code={zip_code}
            id={id}
          />
        )}
      </div>
    </editContext.Provider>
  );
}

function DeleteAddressForm({
  id,
  className,
}: {
  id: number;
  className?: string;
}) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteAddress(id),
    onSuccess: () => {
      router.invalidate();
      setConfirm(false);
    },
  });

  return (
    <div className={className}>
      <p
        onClick={(e) => {
          e.stopPropagation();
          setConfirm(true);
        }}
        className="text-sm cursor-pointer hover:text-red-500 hover:fill-red-500 transition"
      >
        <Trash2 size={16} />
      </p>
      {confirm && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setConfirm(false);
          }}
          className="fixed top-0 left-0 z-10 h-screen w-screen bg-black/50"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="p-4 w-xs sm:w-md sm:p-8 relative flex flex-col rounded gap-4 bg-gray-100">
              <h1 className="text-xl mb-2 font-semibold">Delete Address</h1>

              <X
                onClick={() => setConfirm(false)}
                className="absolute top-2 right-2 cursor-pointer"
              />
              <p className="text-sm">
                Are you sure you want to delete this address?
              </p>
              <Button
                className="cursor-pointer"
                disabled={isPending}
                onClick={(e) => {
                  e.stopPropagation();
                  mutate();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EditAddressForm({
  first_name,
  last_name,
  address,
  city,
  zip_code,
  id,
}: Address) {
  const router = useRouter();
  const context = useContext(editContext);
  if (!context) return null;
  const { setIsEditing } = context;
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [address_, setAddress_] = useState(address);
  const [city_, setCity_] = useState(city);
  const [zipCode_, setZipCode_] = useState(zip_code);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      updateAddress({
        first_name: firstName,
        last_name: lastName,
        address: address_,
        city: city_,
        zip_code: zipCode_,
        id: id,
      }),
    onSuccess: () => {
      setIsEditing(false);
      router.invalidate();
    },
  });

  return (
    <div
      onClick={() => setIsEditing(false)}
      className="fixed top-0 left-0 z-10 h-screen w-screen bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate();
          }}
          className="p-4 w-xs sm:w-md sm:p-8 relative flex flex-col rounded gap-4 bg-gray-100"
        >
          <h1 className="text-xl mb-2 font-semibold">Edit Address</h1>

          <X
            onClick={() => setIsEditing(false)}
            className="absolute top-2 right-2 cursor-pointer"
          />
          <LabelInput
            label="First name"
            value={firstName}
            name="Firstname"
            className="w-full"
            onValueChange={(value) => setFirstName(value)}
          />
          <LabelInput
            label="Last name"
            value={lastName}
            name="Lastname"
            onValueChange={(value) => setLastName(value)}
          />
          <LabelInput
            label="Address"
            value={address_}
            name="Address"
            onValueChange={(value) => setAddress_(value)}
          />
          <LabelInput
            label="City"
            value={city_}
            name="City"
            onValueChange={(value) => setCity_(value)}
          />
          <LabelInput
            label="Zip code"
            value={zipCode_}
            name="Zip code"
            onValueChange={(value) => setZipCode_(value)}
            type="number"
          />
          <Button className="cursor-pointer" disabled={isPending}>
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

function AddAddressForm({ isDefault = false }: { isDefault?: boolean }) {
  const [active, setActive] = useState(false);
  const router = useRouter();
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
      setActive(false);
      router.invalidate();
    },
  });

  return (
    <div>
      <p
        onClick={() => setActive(!active)}
        className="text-sm cursor-pointer flex items-center gap-1 font-2 font-semibold"
      >
        <Plus size={16} className="translate-y-[2px]" /> <span>Add</span>
      </p>
      {active && (
        <div
          onClick={() => setActive(false)}
          className="fixed top-0 left-0 z-10 h-screen w-screen bg-black/50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutate();
              }}
              className="p-4 w-xs sm:w-md sm:p-8 relative flex flex-col rounded gap-4 bg-gray-100"
            >
              <h1 className="text-xl mb-2 font-semibold">Add Address</h1>

              <X
                onClick={() => setActive(false)}
                className="absolute top-2 right-2 cursor-pointer"
              />
              <LabelInput
                label="First name"
                name="Firstname"
                className="w-full"
                onValueChange={(value) => setFirstName(value)}
              />
              <LabelInput
                label="Last name"
                name="Lastname"
                onValueChange={(value) => setLastName(value)}
              />
              <LabelInput
                label="Address"
                name="Address"
                onValueChange={(value) => setAddress_(value)}
              />
              <LabelInput
                label="City"
                name="City"
                onValueChange={(value) => setCity_(value)}
              />
              <LabelInput
                label="Zip code"
                name="Zip code"
                type="number"
                onValueChange={(value) => setZipCode_(value)}
              />
              <Button disabled={isPending} className="cursor-pointer">
                Save
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
