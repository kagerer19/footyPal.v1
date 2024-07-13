import {db} from "../config/firebaseConfig";
import {Request, Response, NextFunction} from "express";
import {Game} from "../models/Game";

const COLLECTION_NAME = "games"

//Create game
exports.createGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameData = {
            gameLocation: req.body.gameLocation,
            availableSpots: req.body.availableSpots,
            dateTime: req.body.dateTime
        };

        const gameDoc = await db.collection(COLLECTION_NAME).add(gameData);

        res.status(201).json({
            success: true,
            game: {
                id: gameDoc.id,
                ...gameData
            }
        });
    } catch (ErrorResponse) {
        next(ErrorResponse);
    }
};

//show games
exports.showGames = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const gamesSnapshot = await db.collection(COLLECTION_NAME).get();
        const games: Game[] = gamesSnapshot.docs.map(doc => {
            const data = doc.data();

            return {
                gameid: doc.id,
                gameLocation: data.gameLocation,
                availableSpots: data.availableSpots,
                // !TODO Adjust the dateTime stamp once frontend development begins. Date and time will be added correctly once the dat and time picker gets implemented
                dateTime: data.dateTime
            };
        }) as Game[];

        res.status(200).json({
            success: true,
            games
        });
    } catch (ErrorResponse) {
        next(ErrorResponse);
    }
};

//Get Game
exports.showGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = req.params.gameid
        const gamesSnapshot = await db.collection(COLLECTION_NAME).doc(game).get();

        if (!gamesSnapshot.exists) {
            return res.status(404).json({
                success: false,
                message: "Game not found."
            });
        }

        const retrievedGame = gamesSnapshot.data()

        return res.status(200).json({
            success: true,
            retrievedGame
        });
    } catch (ErrorResponse) {
        console.error("Error caught in showGames:", ErrorResponse);
        next(ErrorResponse);
    }
};

//Update Game
exports.updateGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameId = req.params.gameid;
        const updatedGame: Game = {
            gameLocation: req.body.gameLocation,
            availableSpots: req.body.availableSpots,
            dateTime: req.body.dateTime
        }

        await db.collection(COLLECTION_NAME).doc(gameId).update(updatedGame);

        const existingGame = await db.collection(COLLECTION_NAME).doc(gameId).get();
        if (!existingGame) {
            return res.status(404).json({
                success: false,
                error: 'Game not found',
            });
        }

        // Send the updated job as a response
        res.status(200).json({
            success: true,
            job: updatedGame,
        });
    } catch (ErrorResponse) {
        next(ErrorResponse);
    }
};


// Delete Game
exports.deleteGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameId = req.params.gameid;
        const gamesSnapshot = await db.collection(COLLECTION_NAME).doc(gameId).get();

        if (!gamesSnapshot.exists) {
            return res.status(404).json({
                success: false,
                message: "Game not found."
            });
        }

        await db.collection(COLLECTION_NAME).doc(gameId).delete();
        res.status(200).json({
            success: true,
            message: "Game deleted."
        })
    } catch (ErrorResponse) {
        next(ErrorResponse);
    }
}