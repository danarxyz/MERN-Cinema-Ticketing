import { Request, Response } from "express";
import { theaterSchema } from "../utils/zodSchema";
import Theater from "../models/Theater";

export const getTheater = async (req: Request, res: Response) => {
    try{
        const theaters = await Theater.find();

        return res.status(200).json({
            data: theaters,
            message: "Theater retrieved successfully",
            status: "success"
        });
    }
    catch(error){
        return res.status(500).json({
            data: null,
            message: "Failed to retrieved theater",
            status: "failed"
        });
    }
};
export const getTheaterDetail = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;

        const theaters = await Theater.findById(id);

        return res.status(200).json({
            data: theaters,
            message: "Theaters retrieved successfully",
            status: "success"
        });
    }
    catch(error){
        return res.status(500).json({
            data: null,
            message: "Failed to retrieved Theaters",
            status: "failed"
        });
    }
};

export const postTheater = async (req: Request, res: Response) => {
    try{
        const body = theaterSchema.parse(req.body);

        const theater = new Theater({
            name: body.name,
            city: body.city
        });

        const newTheater = await theater.save();

        return res.status(200).json({
            data: newTheater,
            message: "Theater added successfully",
            status: "success",
        });
    }
    catch(error){
        return res.status(500).json({
            data: null,
            message: "Failed to add theater",
            status: "failed"
        });
    }
};

export const putTheaters = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;

        const body = theaterSchema.parse(req.body);

        await Theater.findByIdAndUpdate(id, {
            name: body.name,
            city: body.city
        });

        const updatedData = await Theater.findById(id);

        return res.status(200).json({
            data: updatedData,
            message: "Theater updated successfully",
            status: "success",
        });
    }
    catch(error){
        return res.status(500).json({
            data: null,
            message: "Failed to update Theater",
            status: "failed"
        });
    }
};

export const deleteTheater = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;

        const deletedData = await Theater.findById(id);

        await Theater.findByIdAndDelete(id);

        return res.status(200).json({
            data: deletedData,
            message: "Theater deleted successfully",
            status: "success",
        });
    }
    catch(error){
        return res.status(500).json({
            data: null,
            message: "Failed to delete Theater",
            status: "failed"
        });
    }
};