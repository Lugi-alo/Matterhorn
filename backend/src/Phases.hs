module Phases (
    Phase(..),
    getPhases,
    runPhases
) where

data Phase = Phase {
    phaseId :: Int,
    phaseName :: String,
    phaseDescription :: String,
    phaseDuration :: Int
} deriving Show

getPhases :: IO [Phase]
getPhases = do
    putStrLn "Enter phases"
    let loop :: Int -> [Phase] -> IO [Phase]
        loop n phases = do
            putStrLn ""
            putStrLn "Phase Name: "
            name <- getLine
            if null name
                then return (reverse phases)
                else do
                    putStrLn "Phase Description: "
                    description <- getLine
                    putStrLn "Phase Duration (in days): "
                    durationString <- getLine
                    let duration = read durationString :: Int
                    let newPhase = Phase n name description duration
                    loop (n + 1) (newPhase : phases)
    loop 1 []

runPhases :: [Phase] -> IO ()
runPhases phases = do
    putStrLn "Running Phases:"
    mapM_ (\phase ->
        putStrLn $ show (phaseId phase) ++ ". " ++ phaseName phase ++
                   " - " ++ phaseDescription phase ++
                   " (" ++ show (phaseDuration phase) ++ " days)"
          ) phases
