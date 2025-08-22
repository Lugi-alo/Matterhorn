{-# LANGUAGE DeriveGeneric #-}

module Phases (
    Workflow(..),
    Phase(..),
    initialiseWorkflow,
    advanceWorkflow,
    moveToPhase
) where

import GHC.Generics (Generic)
import Data.Aeson (ToJSON, FromJSON)

instance ToJSON PhaseState
instance ToJSON Phase
instance ToJSON Workflow
instance FromJSON PhaseState
instance FromJSON Phase
instance FromJSON Workflow

data Workflow = Workflow {
    phases :: [Phase] 
} deriving (Show, Eq, Generic)

data Phase = Phase {
    unique :: Int,
    name :: String,
    description :: String,
    duration :: Int,
    state :: PhaseState
} deriving (Show, Eq, Generic)

data PhaseState = Pending | InProgress | Completed deriving (Show, Eq, Generic)

initialiseWorkflow :: Workflow -> Workflow
initialiseWorkflow (Workflow [])  = (Workflow[])
initialiseWorkflow (Workflow (phase:phases)) = Workflow (phase { state = InProgress } : map (\x -> x { state = Pending }) phases)

advanceWorkflow :: Workflow -> Workflow
advanceWorkflow (Workflow phase) = Workflow (moveToPhase phase)

moveToPhase :: [Phase] -> [Phase]
moveToPhase [] = []
moveToPhase (Phase unique name description duration InProgress : toEnd) =
    Phase unique name description duration Completed :
        case toEnd of
            [] -> []
            (Phase id_next name description duration Pending : toEnd') -> Phase id_next name description duration InProgress : toEnd'
            _ -> toEnd
moveToPhase (phase:phases) = phase : moveToPhase phases

--runPhases :: [Phase] -> IO ()
--runPhases phases = do
  --  putStrLn "Running Phases:"
  --  mapM_ (\phase ->
    --    putStrLn $ show (unique phase) ++ ". " ++ name phase ++
      --             " - " ++ description phase ++
        --           " (" ++ show (duration phase) ++ " days)"
         -- ) phases
