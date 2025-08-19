module Main (main) where

import Phases

main :: IO ()
main = do
  putStrLn "Would you like to create a new phase model (y/n)"
  answer <- getLine
  if answer == "y"
    then do
      phases <- getPhases
      runPhases phases
      let initialised = initialisePhase phases
      print initialised
      let moved = moveToPhase initialised
      print moved
    else putStrLn "Goodbye!"
