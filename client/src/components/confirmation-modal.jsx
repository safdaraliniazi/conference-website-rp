import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export function ConfirmationModal({ open, handleOpen, titleOfModal, message, actionOnConfirm }) {
    return (
        <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="bg-white shadow-none"
            dismiss={{
                outsidePress: false,
                escapeKey: false
            }}
        >
            <DialogHeader className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-orange-50 p-2">
                        <ExclamationTriangleIcon className="h-6 w-6 text-orange-500" />
                    </div>
                    <Typography variant="h5" color="blue-gray" className="font-medium">
                        {titleOfModal}
                    </Typography>
                </div>
                <IconButton
                    color="blue-gray"
                    size="sm"
                    variant="text"
                    className="p-2"
                    onClick={handleOpen}
                >
                    <XMarkIcon className="h-5 w-5" />
                </IconButton>
            </DialogHeader>

            <DialogBody className="pt-0">
                <Typography className="font-normal text-gray-600">
                    {message}
                </Typography>
            </DialogBody>

            <DialogFooter className="flex justify-end gap-3 pt-3">
                <Button
                    variant="text"
                    color="gray"
                    onClick={handleOpen}
                    className="focus:ring-0"
                >
                    Cancel
                </Button>
                <Button
                    variant="filled"
                    color="orange"
                    onClick={() => {
                        actionOnConfirm();
                        handleOpen();
                    }}
                    className="focus:ring-0"
                >
                    Confirm
                </Button>
            </DialogFooter>
        </Dialog>
    );
}