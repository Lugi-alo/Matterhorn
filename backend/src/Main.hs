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
    else putStrLn "Goodbye!"
