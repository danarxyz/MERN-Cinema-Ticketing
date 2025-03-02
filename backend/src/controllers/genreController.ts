import { Request, Response } from "express";
import Genre from "../models/Genre";
import { genreSchema } from "../utils/zodSchema";

export const getGenres = async (req: Request, res: Response) => {
    try{
        const genres = await Genre.find();

        return res.status(200).json({
            data: genres,
            message: "Genres retrieved successfully",
            status: "success"
        });
    }
    catch(error){
        return res.status(500).json({
            data: null,
            message: "Failed to retrieved genres",
            status: "failed"
        });
    }
};
export const getGenreDetail = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;

        const genres = await Genre.findById(id);

        return res.status(200).json({
            data: genres,
            message: "Genres retrieved successfully",
            status: "success"
        });
    }
    catch(error){
        return res.status(500).json({
            data: null,
            message: "Failed to retrieved genres",
            status: "failed"
        });
    }
};

export const postGenres = async (req: Request, res: Response) => {
    try{
        const body = genreSchema.parse(req.body);

        const genre = new Genre({
            name: body.name
        });

        const newGenre = await genre.save();

        return res.status(200).json({
            data: newGenre,
            message: "Genre added successfully",
            status: "success",
        });
    }
    catch(error){
        return res.status(500).json({
            data: null,
            message: "Failed to add genre",
            status: "failed"
        });
    }
};

export const putGenres = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;

        const body = genreSchema.parse(req.body);

        await Genre.findByIdAndUpdate(id, {
            name: body.name
        });

        const updatedData = await Genre.findById(id);

        return res.status(200).json({
            data: updatedData,
            message: "Genre updated successfully",
            status: "success",
        });
    }
    catch(error){
        return res.status(500).json({
            data: null,
            message: "Failed to update genre",
            status: "failed"
        });
    }
};

export const deleteGenres = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;

        const deletedData = await Genre.findById(id);

        await Genre.findByIdAndDelete(id);

        return res.status(200).json({
            data: deletedData,
            message: "Genre deleted successfully",
            status: "success",
        });
    }
    catch(error){
        return res.status(500).json({
            data: null,
            message: "Failed to delete genre",
            status: "failed"
        });
    }
};