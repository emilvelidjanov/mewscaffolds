; >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CONFIGURATION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

; Temparature
;T = 770
; Pressure
;P = 40

; Maximum width of the collector in X direction
1 XMAX! = 230
; Minimum width of the collector in X direction
1 XMIN! = 71
; Maximum height of the collector in Y direction
1 YMAX! = 212
; Minimum height of the collector in Y direction
1 YMIN! = 40
; Distance of print head from the collector in Z direction
1 ZDIST! = 4
; Speed / feedrate of the print head
1 SPEED! = 300 

; The height of a single slide
1 SLIDE_HEIGHT! = 26
; The width of a single slide
1 SLIDE_WIDTH! = 76
; Margin to keep some extra space from the slide edges
1 SLIDE_MARGIN! = 2

; Height of the stabilization area
1 STAB_HEIGHT! = 15
; Width of the stabilization area
1 STAB_WIDTH! = 15

LP moveAbsoluteZ(ZDIST!)
LP moveAbsolute(XMIN!, YMAX!, SPEED!)
LP initCoordinateSystem()

; >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CONFIGURATION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



; >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STABILIZATION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

; Move in place so the stabilization is centered vertically on the slide
LP moveRelative(SLIDE_MARGIN!, -SLIDE_MARGIN!, SPEED!)
; Stabilize for about 10 minutes
LP stabilize(1, 1, STAB_WIDTH!, STAB_HEIGHT!, 1, SPEED!)
; Move to the slide above the stabilization slide
LP moveAbsolute(0, -SLIDE_HEIGHT!, SPEED!)
LP initCoordinateSystem()

; >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STABILIZATION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



; >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VARIABLES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

; TESTING VARIABLES
; Radius of the navigation from previous layer to next layer TEMPORARY
1 ORBIT_RADIUS! = 10


; ACTUALLY USED VARIABLES
; Number of scaffolds
1 SCF_NUMBER% = 4

; Number of layers of each scaffold
1 DIM LAY_NUMBERS% (4)
1 LAY_NUMBERS%(1) = 1
1 LAY_NUMBERS%(2) = 1
1 LAY_NUMBERS%(3) = 1
1 LAY_NUMBERS%(4) = 1

; X coordinates of scaffolds
; For now just for testing purposes
1 DIM X_SCF_POSITIONS! (4)
1 X_SCF_POSITIONS!(1) = SLIDE_MARGIN! + ORBIT_RADIUS!
1 X_SCF_POSITIONS!(2) = SLIDE_MARGIN! + ORBIT_RADIUS! + 30
1 X_SCF_POSITIONS!(3) = SLIDE_MARGIN! + ORBIT_RADIUS!
1 X_SCF_POSITIONS!(4) = SLIDE_MARGIN! + ORBIT_RADIUS! + 30

; Y coordinates of scaffolds
1 DIM Y_SCF_POSITIONS! (4)
1 Y_SCF_POSITIONS!(1) = -SLIDE_HEIGHT! / 2
1 Y_SCF_POSITIONS!(2) = -SLIDE_HEIGHT! / 2
1 Y_SCF_POSITIONS!(3) = -SLIDE_HEIGHT! - (SLIDE_HEIGHT! / 2)
1 Y_SCF_POSITIONS!(4) = -SLIDE_HEIGHT! - (SLIDE_HEIGHT! / 2)

; SINUSOIDALS
; Whether a layer is sinusoidal or not
1 DIM LAY_SINUSOIDALS? (4, 4)
1 FOR I% = 1 TO SCF_NUMBER%
1	 FOR J% = 1 TO LAY_NUMBERS%(I%)
1		LAY_SINUSOIDALS?(I%, J%) = TRUE
1	 NEXT J%
1 NEXT I%

; Phase lengths of each scaffolds sinusoidal layers
1 DIM LAY_PHASES! (4, 4)
1 FOR I% = 1 TO SCF_NUMBER%
1	 FOR J% = 1 TO LAY_NUMBERS%(I%)
1		IF (LAY_SINUSOIDALS?(I%, J%) = TRUE) THEN LAY_PHASES!(I%, J%) = 1 ENDIF
1	 NEXT J%
1 NEXT I%

; Phase shift of each scaffolds sinusoidal layers
1 DIM LAY_PHSHIFTS! (4, 4)
1 FOR I% = 1 TO SCF_NUMBER%
1	 FOR J% = 1 TO LAY_NUMBERS%(I%)
1		IF (LAY_SINUSOIDALS?(I%, J%) = TRUE) THEN LAY_PHSHIFTS!(I%, J%) = 0 ENDIF
1	 NEXT J%
1 NEXT I%

; Amplitude of each scaffolds sinusoidal layers
1 DIM LAY_AMPLITUDES! (4, 4)
1 FOR I% = 1 TO SCF_NUMBER%
1	 FOR J% = 1 TO LAY_NUMBERS%(I%)
1		IF (LAY_SINUSOIDALS?(I%, J%) = TRUE) THEN LAY_AMPLITUDES!(I%, J%) = 0.5 ENDIF
1	 NEXT J%
1 NEXT I%
; SINUSOIDALS

; Widths of each scaffolds layers
1 DIM LAY_WIDTHS! (4, 4)
1 FOR I% = 1 TO SCF_NUMBER%
1	FOR J% = 1 TO LAY_NUMBERS%(I%)
1		LAY_WIDTHS!(I%, J%) = 15
1	NEXT J%
1 NEXT I%

; Heights of each scaffolds layers
1 DIM LAY_HEIGHTS! (4, 4)
1 FOR I% = 1 TO SCF_NUMBER%
1	FOR J% = 1 TO LAY_NUMBERS%(I%)
1		LAY_HEIGHTS!(I%, J%) = 15
1		IF (LAY_SINUSOIDALS?(I%, J%) = TRUE) THEN 
1			LAY_HEIGHTS!(I%, J%) = LAY_HEIGHTS!(I%, J%) - (2 * LAY_AMPLITUDES!(I%, J%))
1		ENDIF
1 	NEXT J%
1 NEXT I%

; Orbit radii of each scaffold
1 DIM SCF_ORBITS! (4)
1 FOR I% = 1 TO SCF_NUMBER%
1	SCF_ORBITS!(I%) = 0
1 NEXT I%
; Calculate all orbit radii 
1 FOR I% = 1 TO SCF_NUMBER%
1	FOR J% = 1 TO LAY_NUMBERS%(I%)
1		TMP_RADIUS! = SQRT(EXP(2, LAY_HEIGHTS!(I%, J%)) + EXP(2, LAY_WIDTHS!(I%, J%))) / 2
1		IF TMP_RADIUS! > SCF_ORBITS!(I%) THEN
			; Found the biggest radius of the scaffold, save it and add a safety margin to avoid errors
1			SCF_ORBITS!(I%) = TMP_RADIUS! + 2
1		ENDIF
1	NEXT J%
1 NEXT I%

; Angles of each scaffolds layers
1 DIM LAY_ANGLES! (4, 4)
1 FOR I% = 1 TO SCF_NUMBER%
1	 FOR J% = 1 TO LAY_NUMBERS%(I%)
1		LAY_ANGLES!(I%, J%) = 0
1	 NEXT J%
1 NEXT I%
1 LAY_ANGLES!(1, 1) = 0
1 LAY_ANGLES!(1, 2) = 45
1 LAY_ANGLES!(1, 3) = 90
1 LAY_ANGLES!(1, 4) = 135
1 LAY_ANGLES!(2, 1) = 0
1 LAY_ANGLES!(2, 2) = 135
1 LAY_ANGLES!(2, 3) = 225
1 LAY_ANGLES!(2, 4) = 315
1 LAY_ANGLES!(3, 1) = 0
1 LAY_ANGLES!(3, 2) = 45
1 LAY_ANGLES!(3, 3) = 67.5
1 LAY_ANGLES!(3, 4) = 90
1 LAY_ANGLES!(4, 1) = 0
1 LAY_ANGLES!(4, 2) = 45
1 LAY_ANGLES!(4, 3) = 67.5
1 LAY_ANGLES!(4, 4) = 90

; Distances between each fiber of each scaffolds layers
1 DIM FIB_DISTANCES! (4, 4)
1 FOR I% = 1 TO SCF_NUMBER%
1	 FOR J% = 1 TO LAY_NUMBERS%(I%)
1		FIB_DISTANCES!(I%, J%) = 0.5
1	 NEXT J%
1 NEXT I%

; Number of fibers of each scaffolds layers
1 DIM FIB_NUMBERS% (4, 4)
1 FOR I% = 1 TO SCF_NUMBER%
1	FOR J% = 1 TO LAY_NUMBERS%(I%)
1		TMP_DIST! = FIB_DISTANCES!(I%, J%)
1		TMP_HEIGHT! = LAY_HEIGHTS!(I%, J%)
		; Off by one, so 1 is added
1		FIB_NUMBERS%(I%, J%) = INT(TMP_HEIGHT! / TMP_DIST!) + 1
1	NEXT J%
1 NEXT I%

; Wait in times in seconds of each scaffolds layers
1 DIM LAY_IN_WAITS! (4, 4)
1 FOR I% = 1 TO SCF_NUMBER%
1	 FOR J% = 1 TO LAY_NUMBERS%(I%)
1		LAY_IN_WAITS!(I%, J%) = 0.2
1	 NEXT J%
1 NEXT I%

; Wait out times in seconds of each scaffolds layers
1 DIM LAY_OUT_WAITS! (4, 4)
1 FOR I% = 1 TO SCF_NUMBER%
1	 FOR J% = 1 TO LAY_NUMBERS%(I%)
1		LAY_OUT_WAITS!(I%, J%) = 0.06
1	 NEXT J%
1 NEXT I%

; Feedrates of each scaffolds layers
1 DIM LAY_SPEEDS! (4, 4)
1 FOR I% = 1 TO SCF_NUMBER%
1	 FOR J% = 1 TO LAY_NUMBERS%(I%)
1		LAY_SPEEDS!(I%, J%) = 300
1	 NEXT J%
1 NEXT I%

; FEEDRATES FOR SINUSOID TESTS
1 LAY_SPEEDS!(1, 1) = 200
1 LAY_SPEEDS!(2, 1) = 250
1 LAY_SPEEDS!(3, 1) = 300
1 LAY_SPEEDS!(4, 1) = 350

; PATHFINDING
; Number of nodes in total
1 #NODE_NUMBER% = SCF_NUMBER% * 4

; Directions of the pathfinding nodes from the center of a scaffold
1 DIM #NODE_TO_CENTER_ANGLES! (4)
1 #NODE_TO_CENTER_ANGLES!(1) = 135
1 #NODE_TO_CENTER_ANGLES!(2) = 45
1 #NODE_TO_CENTER_ANGLES!(3) = 225
1 #NODE_TO_CENTER_ANGLES!(4) = 315

; X and Y coordinates of all pathfinding nodes
1 DIM #NODE_X_COORDINATES! (16)
1 DIM #NODE_Y_COORDINATES! (16)
1 N_COUNT% = 1
1 FOR I% = 1 TO SCF_NUMBER%
1	PATHF_RADIUS! = SQRT(2 * EXP(2, SCF_ORBITS!(I%) * 2)) / 2
1	FOR A% = 1 TO 4
1		#NODE_X_COORDINATES!(N_COUNT%) = X_SCF_POSITIONS!(I%) + (PATHF_RADIUS! * COS(#NODE_TO_CENTER_ANGLES!(A%)))
1		#NODE_Y_COORDINATES!(N_COUNT%) = Y_SCF_POSITIONS!(I%) + (PATHF_RADIUS! * SIN(#NODE_TO_CENTER_ANGLES!(A%)))
1		N_COUNT% = N_COUNT% + 1
1	NEXT A%
1 NEXT I%

; Helper array to mark already "excluded" nodes
1 DIM #NODE_IS_EXCLUDED? (16)
1 FOR I% = 1 TO #NODE_NUMBER%
1	#NODE_IS_EXCLUDED?(I%) = FALSE
1 NEXT I%
; PATHFINDING

; >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VARIABLES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



; >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> MAIN PROGRAM <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

1 FOR S% = 1 TO SCF_NUMBER%
1 	RX_SCF_POSITION! = X_SCF_POSITIONS!(S%)
1 	RY_SCF_POSITION! = Y_SCF_POSITIONS!(S%)
1	RSCF_ORBIT! = SCF_ORBITS!(S%)

	LP navigatePathToScaffold(S%, LAY_ANGLES!(S%, 1), SPEED!)

1 	FOR L% = 1 TO LAY_NUMBERS%(S%)
1		RLAY_ANGLE! = LAY_ANGLES!(S%, L%)
1		RPREV_LAY_ANGLE! = RLAY_ANGLE!
1		IF L% > 1 THEN
1			RPREV_LAY_ANGLE! = LAY_ANGLES!(S%, L% - 1)
1		ENDIF
1		RLAY_WIDTH! = LAY_WIDTHS!(S%, L%)
1		RLAY_HEIGHT! = LAY_HEIGHTS!(S%, L%)
1		RFIB_NUMBER% = FIB_NUMBERS%(S%, L%)
1		RFIB_DISTANCE! = FIB_DISTANCES!(S%, L%)
1		RLAY_IN_WAIT! = LAY_IN_WAITS!(S%, L%)
1		RLAY_OUT_WAIT! = LAY_OUT_WAITS!(S%, L%)
1		RLAY_SPEED! = LAY_SPEEDS!(S%, L%)

1		RLAY_SINUSOIDAL? = LAY_SINUSOIDALS?(S%, L%)
1		IF (RLAY_SINUSOIDAL? = TRUE) THEN
1			RLAY_PHASE! = LAY_PHASES!(S%, L%)
1			RLAY_PHSHIFT! = LAY_PHSHIFTS!(S%, L%)
1			RLAY_AMPLITUDE! = LAY_AMPLITUDES!(S%, L%)
1		ENDIF

		LP navigateToNextLayer(RX_SCF_POSITION!, RY_SCF_POSITION!, RSCF_ORBIT!, RPREV_LAY_ANGLE!, RLAY_ANGLE!, RLAY_WIDTH!, RLAY_HEIGHT!)
		
1		IF (RLAY_SINUSOIDAL? = TRUE) THEN
			LP drawLayerSinusoidal(RFIB_NUMBER%, RLAY_WIDTH!, RLAY_PHASE!, RLAY_PHSHIFT!, RLAY_AMPLITUDE!, RFIB_DISTANCE!, RLAY_ANGLE!, RLAY_IN_WAIT!, RLAY_OUT_WAIT!, RLAY_SPEED!)
1		ELSE
			LP drawLayer(RFIB_NUMBER%, RLAY_WIDTH!, RFIB_DISTANCE!, RLAY_ANGLE!, RLAY_IN_WAIT!, RLAY_OUT_WAIT!, RLAY_SPEED!)
1		ENDIF
1 	NEXT L%
1 NEXT S%

; >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> MAIN PROGRAM <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



; >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SUBROUTINES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
; Unless otherwise specified, all parameters describing...
; ...translatory positions are measured in mm.
; ...translatory velocities are measured in mm/min.
; ...rotary positions are measured in degrees.
; ...rotary velocities are measured in degrees/min.

; Moves in absolute coordinates.
; P1 - X coordinate
; P2 - Y coordinate
; P3 - Feedrate
LPS moveAbsolute
1	X_COORD! = P1
1	Y_COORD! = P2
1	SPEED! = P3
	G90 G01 X[X_COORD!] Y[Y_COORD!] F[SPEED!]
PEND

; Moves relative to the current position.
; P1 - X offset
; P2 - Y offset
; P3 - Feedrate
LPS moveRelative
1	X_COORD! = P1
1	Y_COORD! = P2
1	SPEED! = P3
	G91 G01 X[X_COORD!] Y[Y_COORD!] F[SPEED!]
PEND

; Moves relative to current position.
; P1 - Length of the movement
; P2 - Mathematical angle of the movement (X-axis = 0)
; P3 - Feedrate
LPS movePolarRelativeX
1	LENGTH! = P1
1	ANGLE! = P2
1	SPEED! = P3
	POP()
	G91 G01(POL) X[LENGTH!] A[ANGLE!] F[SPEED!]
PEND

; Moves in absolute coordinates in Z-Direction with a set speed of 100.
; P1 - Distance to move in Z direction
LPS moveAbsoluteZ
1	ZDIST! = P1
	G90 G01 Z[ZDIST!] F100
PEND

; Sets the origin of the coordinate system to the current position.
LPS initCoordinateSystem
	G92 X[0] Y[0] Z[0]
PEND

; Pauses movement.
; P1 - Time to pause in seconds
LPS waitForSeconds
1	SECONDS! = P1
	G04 F[SECONDS!]
PEND

; Moves in a clockwise circle in absolute coordinates.
; P1 - Target point X
; P2 - Target point Y
; P3 - Circle center point X
; P4 - Circle center point Y
; P5 - Feedrate
LPS moveClockwiseAbsolute
1	X_TARGET! = P1
1	Y_TARGET! = P2
1	X_CENTER_OFFSET! = P3
1	Y_CENTER_OFFSET! = P4
1	SPEED! = P5
	G90 G02 X[X_TARGET!] Y[Y_TARGET!] I[X_CENTER_OFFSET!] J[Y_CENTER_OFFSET!] F[SPEED!]
PEND

; Moves in a clockwise circle in absolute coordinates.
; P1 - Target point X
; P2 - Target point Y
; P3 - Circle center point X
; P4 - Circle center point Y
; P5 - Feedrate
LPS moveCounterClockwiseAbsolute
1	X_TARGET! = P1
1	Y_TARGET! = P2
1	X_CENTER_OFFSET! = P3
1	Y_CENTER_OFFSET! = P4
1	SPEED! = P5
	G90 G03 X[X_TARGET!] Y[Y_TARGET!] I[X_CENTER_OFFSET!] J[Y_CENTER_OFFSET!] F[SPEED!]
PEND

; Moves in a clockwise circle relative to current position.
; P1 - Target point X offset
; P2 - Target point Y offset
; P3 - Circle center point X offset
; P4 - Circle center point Y offset
; P5 - Wait time into the circle motion in seconds
; P6 - Wait time out of the circle motion in seconds
; P7 - Feedrate
LPS moveClockwiseRelative
1	X_TARGET_OFFSET! = P1
1	Y_TARGET_OFFSET! = P2
1	X_CENTER_OFFSET! = P3
1	Y_CENTER_OFFSET! = P4
1	WAIT_IN! = P5
1	WAIT_OUT! = P6
1	SPEED! = P7
	LP waitForSeconds(WAIT_IN!)
	G91 G02 X[X_TARGET_OFFSET!] Y[Y_TARGET_OFFSET!] I[X_CENTER_OFFSET!] J[Y_CENTER_OFFSET!] F[SPEED!]
	LP waitForSeconds(WAIT_OUT!)
PEND

; Moves in a counter clockwise circle relative to current position.
; P1 - Target point X offset
; P2 - Target point Y offset
; P3 - Circle center point X offset
; P4 - Circle center point Y offset
; P5 - Wait time into the circle motion in seconds
; P6 - Wait time out of the circle motion in seconds
; P7 - Feedrate
LPS moveCounterClockwiseRelative
1	X_TARGET_OFFSET! = P1
1	Y_TARGET_OFFSET! = P2
1	X_CENTER_OFFSET! = P3
1	Y_CENTER_OFFSET! = P4
1	WAIT_IN! = P5
1	WAIT_OUT! = P6
1	SPEED! = P7
	LP waitForSeconds(WAIT_IN!)
	G91 G03 X[X_TARGET_OFFSET!] Y[Y_TARGET_OFFSET!] I[X_CENTER_OFFSET!] J[Y_CENTER_OFFSET!] F[SPEED!]
	LP waitForSeconds(WAIT_OUT!)
PEND

; TODO: include radius
; Moves in a clockwise circle relative to current position.
; The radius of the circle is equal to 1.
; P1 - Distance to target point
; P2 - Angle to target point
; P3 - Wait time into the circle motion in seconds
; P4 - Wait time out of the circle motion in seconds
; P5 - Feedrate
LPS moveClockwisePolarX
1	TARGET_DISTANCE! = P1
1	TARGET_ANGLE! = P2
1	WAIT_IN! = P3
1	WAIT_OUT! = P4
1	SPEED! = P5
1	RADIUS! = 1
	LP waitForSeconds(WAIT_IN!)
	POP(ACTPOS)
	G91 G02(POL) X[TARGET_DISTANCE!] A[TARGET_ANGLE!] R[-RADIUS!] F[SPEED!]
	LP waitForSeconds(WAIT_OUT!)
PEND

; Moves in a counter clockwise circle relative to current position.
; The radius of the circle is equal to 1.
; P1 - Distance to target point
; P2 - Angle to target point
; P3 - Wait time into the circle motion in seconds
; P4 - Wait time out of the circle motion in seconds
; P5 - Feedrate
LPS moveCounterClockwisePolarX
1	TARGET_DISTANCE! = P1
1	TARGET_ANGLE! = P2
1	WAIT_IN! = P3
1	WAIT_OUT! = P4
1	SPEED! = P5
1	RADIUS! = 1
	LP waitForSeconds(WAIT_IN!)
	POP(ACTPOS)
	G91 G03(POL) X[TARGET_DISTANCE!] A[TARGET_ANGLE!] R[-RADIUS!] F[SPEED!]
	LP waitForSeconds(WAIT_OUT!)
PEND

; Line test.
; P1 - Length of each line
; P2 - Distance between the lines
; P3 - Number of lines to draw
; P4 - Feedrate
LPS lineTest
1	LINE_LENGTH! = P1
1 	LINE_DISTANCE! = P2
1 	LINE_NUMBER% = INT(ROUND(P3 / 2))
1 	SPEED! = P4
1 	LOOP_SIZE! = LINE_DISTANCE! / 2
1 	WAIT_IN! = 0.2
1 	WAIT_OUT! = 0.2
1 	FOR I%=1 TO LINE_NUMBER%
1		ADDITIONAL_DISTANCE! = 0
1		EVEN_CHECK% = INT(I% / 2) * 2
1		IF EVEN_CHECK% = I% THEN
1			ADDITIONAL_DISTANCE! = LINE_DISTANCE!
1		ENDIF		
		LP movePolarRelativeX(LINE_LENGTH!, 90, SPEED!)
		LP moveClockwisePolarX(LINE_DISTANCE! + ADDITIONAL_DISTANCE!, 0, WAIT_IN!, WAIT_OUT!, SPEED!)
		LP movePolarRelativeX(LINE_LENGTH!, -90, SPEED!)
		LP moveCounterClockwisePolarX(LINE_DISTANCE!, 0, WAIT_IN!, WAIT_OUT!, SPEED!)
1 	NEXT I%
PEND

; Draws a single fiber.
; P1 - Length of the fiber
; P2 - Mathematical angle of the fiber (relative to X-axis)
; P3 - Distance to the next fiber
; P4 - Whether to do a clockwise (1) or counter clockwise (0) circle at the end of the fiber
; P5 - Wait time into the circle motion in seconds
; P6 - Wait time out of the circle motion in seconds
; P7 - Feedrate
LPS drawFiber
1	FIBER_LENGTH! = P1
1	FIBER_ANGLE! = P2
1	FIBER_DISTANCE! = P3
1	CLOCKWISE_TURN% = INT(P4)
1	WAIT_IN! = P5
1	WAIT_OUT! = P6
1	SPEED! = P7
	LP movePolarRelativeX(FIBER_LENGTH!, FIBER_ANGLE!, SPEED!)
1	IF CLOCKWISE_TURN% = 1 THEN
1		CIRCLE_ANGLE! = FIBER_ANGLE! - 90
		LP moveClockwisePolarX(FIBER_DISTANCE!, CIRCLE_ANGLE!, WAIT_IN!, WAIT_OUT!, SPEED!)
1	ELSE
1		CIRCLE_ANGLE! = FIBER_ANGLE! + 90
		LP moveCounterClockwisePolarX(FIBER_DISTANCE!, CIRCLE_ANGLE!, WAIT_IN!, WAIT_OUT!, SPEED!)
1	ENDIF
PEND

; TODO: clean up calculation
; Draws a single sine curve.
; P1 - Phase length
; P2 - Phase shift (relative to P4)
; P3 - Amplitude
; P4 - Mathematical angle of the sine central line (relative to X-axis)
; P5 - Phase length cut-off (where to stop the sine wave prematurely, relates to P1)
; P6 - Feedrate
LPS drawSine
1	PHASE! = P1
1	PHASE_SHIFT! = P2
1	AMPLITUDE! = P3
1	ANGLE! = P4
1	CUTOFF! = P5
1	SPEED! = P6
1	LEN_COUNT! = 0
1	LEN_INCREMENT! = PHASE! / 16
1	PREV_X_VALUE! = 0
1	PREV_Y_VALUE! = SIN(PHASE_SHIFT! / PHASE! * 360) * AMPLITUDE!
1	WHILE LEN_COUNT! <= CUTOFF! DO
1		X_VALUE! = LEN_COUNT!
1		Y_VALUE! = SIN((X_VALUE! + PHASE_SHIFT!) / PHASE! * 360) * AMPLITUDE!
1		DELT_X_VALUE! = X_VALUE! - PREV_X_VALUE!
1		DELT_Y_VALUE! = Y_VALUE! - PREV_Y_VALUE!
1		ROT_X_VALUE! = DELT_X_VALUE! * COS(ANGLE!) - DELT_Y_VALUE! * SIN(ANGLE!)
1		ROT_Y_VALUE! = DELT_Y_VALUE! * COS(ANGLE!) + DELT_X_VALUE! * SIN(ANGLE!)
1		LEN_COUNT! = LEN_COUNT! + LEN_INCREMENT!
		LP moveRelative(ROT_X_VALUE!, ROT_Y_VALUE!, SPEED!)
1		PREV_X_VALUE! = X_VALUE!
1		PREV_Y_VALUE! = Y_VALUE!
1	END
1	X_VALUE! = CUTOFF!
1	Y_VALUE! = SIN((X_VALUE! + PHASE_SHIFT!) / PHASE! * 360) * AMPLITUDE!
1	DELT_X_VALUE! = X_VALUE! - PREV_X_VALUE!
1	DELT_Y_VALUE! = Y_VALUE! - PREV_Y_VALUE!
1	ROT_X_VALUE! = DELT_X_VALUE! * COS(ANGLE!) - DELT_Y_VALUE! * SIN(ANGLE!)
1	ROT_Y_VALUE! = DELT_Y_VALUE! * COS(ANGLE!) + DELT_X_VALUE! * SIN(ANGLE!)
	LP moveRelative(ROT_X_VALUE!, ROT_Y_VALUE!, SPEED!)
PEND

; Draws a single sinusoidal fiber.
; P1 - Length of the fiber
; P2 - Mathematical angle of the fiber's central line (relative to X-axis)
; P3 - Distance to the next fiber (at any point of the sine)
; P4 - Phase length
; P5 - Phase shift (relative to P4)
; P6 - Amplitude
; P7 - Whether to do a clockwise (1) or counter clockwise (0) circle at the end of the fiber
; P8 - Wait time into the circle motion in seconds
; P9 - Wait time out of the circle motion in seconds
; P10 - Feedrate
LPS drawFiberSinusoidal
1	FIBER_LENGTH! = P1
1	FIBER_ANGLE! = P2
1	FIBER_DISTANCE! = P3
1	PHASE! = P4
1	PHASE_SHIFT! = P5
1	AMPLITUDE! = P6
1	CLOCKWISE_TURN% = INT(P7)
1	WAIT_IN! = P8
1	WAIT_OUT! = P9
1	SPEED! = P10
1	FREQUENCY! = FIBER_LENGTH! / PHASE!
1	RND_FREQUENCY% = INT(FREQUENCY!)
1	LAST_PHASE_CUTOFF! = (FREQUENCY! - RND_FREQUENCY%) * PHASE!
1	FOR PHASE_COUNT% = 1 TO RND_FREQUENCY%
		LP drawSine(PHASE!, PHASE_SHIFT!, AMPLITUDE!, FIBER_ANGLE!, PHASE!, SPEED!)
1	NEXT PHASE_COUNT%
	LP drawSine(PHASE!, PHASE_SHIFT!, AMPLITUDE!, FIBER_ANGLE!, LAST_PHASE_CUTOFF!, SPEED!)
	; Loop
1	IF CLOCKWISE_TURN% = 1 THEN
1		CIRCLE_ANGLE! = FIBER_ANGLE! - 90
		LP moveClockwisePolarX(FIBER_DISTANCE!, CIRCLE_ANGLE!, WAIT_IN!, WAIT_OUT!, SPEED!)
1	ELSE
1		CIRCLE_ANGLE! = FIBER_ANGLE! + 90
		LP moveCounterClockwisePolarX(FIBER_DISTANCE!, CIRCLE_ANGLE!, WAIT_IN!, WAIT_OUT!, SPEED!)
1	ENDIF
PEND

; Draws a single layer.
; First fiber circle always goes counter clockwise and fibers are always parallel to each other.
; P1 - Number of fibers
; P2 - Length of every fiber
; P3 - Distance between every fiber
; P4 - Mathematical angle of every fiber (relative to X-axis)
; P5 - Wait time into the circle motion in seconds for every fiber
; P6 - Wait time out of the circle motion in seconds for every fiber
; P7 - Feedrate for every fiber
LPS drawLayer
1	FIBER_NUMBER% = INT(P1)
1	FIBER_LENGTH! = P2
1	FIBER_DISTANCE! = P3
1	FIBER_ANGLE! = P4
1	WAIT_IN! = P5
1	WAIT_OUT! = P6
1	SPEED! = P7
1 	FOR I%=1 TO FIBER_NUMBER%
1		CLOCKWISE% = 0
1		PARALLEL_ANGLE! = 0
1		EVEN_CHECK% = INT(I% / 2) * 2
1		IF EVEN_CHECK% = I% THEN
1			CLOCKWISE% = 1
1			PARALLEL_ANGLE! = 180
1		ENDIF
		LP drawFiber(FIBER_LENGTH!, PARALLEL_ANGLE! + FIBER_ANGLE!, FIBER_DISTANCE!, CLOCKWISE%, WAIT_IN!, WAIT_OUT!, SPEED!)
1 	NEXT I%
PEND

; Draws a single layer with sinusoidal fibers.
; First fiber circle always goes counter clockwise and fibers are always parallel to each other.
; P1 - Number of fibers
; P2 - Length of every fiber
; P3 - Phase length
; P4 - Phase shift (relative to P4)
; P5 - Amplitude
; P6 - Distance between every fiber
; P7 - Mathematical angle of every fiber (relative to X-axis)
; P8 - Wait time into the circle motion in seconds for every fiber
; P9 - Wait time out of the circle motion in seconds for every fiber
; P10 - Feedrate for every fiber
LPS drawLayerSinusoidal
1	FIBER_NUMBER% = INT(P1)
1	FIBER_LENGTH! = P2
1	PHASE_LENGTH! = P3
1	PHASE_SHIFT! = P4
1	AMPLITUDE! = P5
1	FIBER_DISTANCE! = P6
1	FIBER_ANGLE! = P7
1	WAIT_IN! = P8
1	WAIT_OUT! = P9
1	SPEED! = P10
1	FREQUENCY! = FIBER_LENGTH! / PHASE_LENGTH!
1	RND_FREQUENCY% = INT(FREQUENCY!)
1	LAST_PHASE_CUTOFF! = (FREQUENCY! - RND_FREQUENCY%) * PHASE_LENGTH!
1 	FOR I%=1 TO FIBER_NUMBER%
		; Correct position for first fiber
1		IF I% = 1 THEN
1			CORR_X_VALUE! = 0
1			CORR_Y_VALUE! = SIN((CORR_X_VALUE! + PHASE_SHIFT!) / PHASE_LENGTH! * 360) * AMPLITUDE!
1			ROT_X_VALUE! = CORR_X_VALUE! * COS(FIBER_ANGLE!) - CORR_Y_VALUE! * SIN(FIBER_ANGLE!)
1			ROT_Y_VALUE! = CORR_Y_VALUE! * COS(FIBER_ANGLE!) + CORR_X_VALUE! * SIN(FIBER_ANGLE!)
			LP moveRelative(ROT_X_VALUE!, ROT_Y_VALUE!, SPEED!)
1		ENDIF
1		CLOCKWISE% = 0
1		PARALLEL_ANGLE! = 0
1		EVEN_CHECK% = INT(I% / 2) * 2
1		CALC_SHIFT! = PHASE_SHIFT!
1		IF EVEN_CHECK% = I% THEN
1			CLOCKWISE% = 1
1			PARALLEL_ANGLE! = 180
1			CALC_SHIFT! = -PHASE_SHIFT! + (PHASE_LENGTH! - LAST_PHASE_CUTOFF!)
1		ENDIF
		LP drawFiberSinusoidal(FIBER_LENGTH!, FIBER_ANGLE! + PARALLEL_ANGLE!, FIBER_DISTANCE!, PHASE_LENGTH!, CALC_SHIFT!, AMPLITUDE!, CLOCKWISE%, WAIT_IN!, WAIT_OUT!, SPEED!)
1 	NEXT I%
PEND

; Orbits around the scaffold to move into position for the next layer.
; P1 - X position of the scaffolds center
; P2 - Y position of the scaffolds center
; P3 - Radius of the navigation-orbit around the layer
; P4 - Angle of the previous layer (should equal P5 if it's the first layer)
; P5 - Angle of the next layer
; P6 - Width of the next layer
; P7 - Height of the next layer
LPS navigateToNextLayer
1	X_CENTER! = P1
1	Y_CENTER! = P2
1	ORBIT_RADIUS! = P3
1	PREVIOUS_LAYER_ANGLE! = P4
1	NEXT_LAYER_ANGLE! = P5
1	LAYER_WIDTH! = P6
1	LAYER_HEIGHT! = P7
1	INTO_ORBIT_ANGLE! = PREVIOUS_LAYER_ANGLE! + 90
1	ORBIT_END_POINT_ANGLE! = NEXT_LAYER_ANGLE! + 180
1	CORR_ANGLE! = NEXT_LAYER_ANGLE! + 270
1	CORR_HEIGHT_LENGTH! = LAYER_HEIGHT! / 2
1	CORR_WIDTH_LENGTH! = ORBIT_RADIUS! - (LAYER_WIDTH! / 2)
1	X_START_POINT! = X_CENTER! + (ORBIT_RADIUS! * COS(INTO_ORBIT_ANGLE!))
1	Y_START_POINT! = Y_CENTER! + (ORBIT_RADIUS! * SIN(INTO_ORBIT_ANGLE!))
1	X_END_POINT! = X_CENTER! + (ORBIT_RADIUS! * COS(ORBIT_END_POINT_ANGLE!))
1	Y_END_POINT! = Y_CENTER! + (ORBIT_RADIUS! * SIN(ORBIT_END_POINT_ANGLE!))
1	DEF_SPEED! = 300
1	DEF_WAIT! = 0.2
	LP moveAbsolute(X_START_POINT!, Y_START_POINT!, DEF_SPEED!)
	LP waitForSeconds(DEF_WAIT!)
	LP moveClockwiseAbsolute(X_END_POINT!, Y_END_POINT!, X_CENTER! - X_START_POINT!, Y_CENTER! - Y_START_POINT!, DEF_SPEED!)
	LP waitForSeconds(DEF_WAIT!)
	LP movePolarRelativeX(CORR_HEIGHT_LENGTH!, CORR_ANGLE!, DEF_SPEED!)
	LP waitForSeconds(DEF_WAIT!)
	LP movePolarRelativeX(CORR_WIDTH_LENGTH!, NEXT_LAYER_ANGLE!, DEF_SPEED!)
PEND

; Uses a simple pathfinding algorithm to find and move the path to the specified scaffold.
; Requires the global variables listed in the variables section under "PATHFINDING".
; P1 - The index of the scaffold to navigate to (as defined by the global variables)
; P2 - Angle of the first layer of the specified scaffold
; P3 - Speed with which to navigate
LPS navigatePathToScaffold
1	S% = INT(P1)
1	ANGLE! = P2 + 90
1	SPEED! = P3
1	WHILE ANGLE! < 0 DO
1		ANGLE! = ANGLE! + 360
1	END
1	IF (ANGLE! > 360) THEN ANGLE! = ANGLE! - 360 ENDIF

	; First, find the correct target node of the scaffold based on the first layer angle
1	NEXT_NODE% = 0
1	TARG_NODE% = 1
1	SMALLEST_ANGLE_DELTA! = 360
1	FOR A% = 1 TO 4
1		ANG_DELTA! = ABS(ANGLE! - #NODE_TO_CENTER_ANGLES!(A%))
1		IF ANG_DELTA! < SMALLEST_ANGLE_DELTA! THEN
1			SMALLEST_ANGLE_DELTA! = ANG_DELTA!
1			TARG_NODE% = (S% - 1) * 4 + A%
1		ENDIF
1	NEXT A%
1	TARG_X_COORDINATE! = #NODE_X_COORDINATES!(TARG_NODE%)
1	TARG_Y_COORDINATE! = #NODE_Y_COORDINATES!(TARG_NODE%)
1	IS_FIRST_ITERATION? = TRUE

	; While target hasn't been reached yet do...
1	WHILE NEXT_NODE% <> TARG_NODE% DO
1		CURR_X_COORDINATE! = PCS("X")
1		CURR_Y_COORDINATE! = PCS("Y")
		; Find the closest, non-excluded node
1		NEXT_NODE% = 0
1		NODE_DISTANCE! = 999999999999
1		FOR N% = 1 TO #NODE_NUMBER%
1			NEXT_X_COORDINATE! = #NODE_X_COORDINATES!(N%)
1			NEXT_Y_COORDINATE! = #NODE_Y_COORDINATES!(N%)
1			C_N_DIST! = SQRT(EXP(2, NEXT_X_COORDINATE! - CURR_X_COORDINATE!) + EXP(2, NEXT_Y_COORDINATE! - CURR_Y_COORDINATE!))
1			IF (C_N_DIST! < NODE_DISTANCE!) AND (#NODE_IS_EXCLUDED?(N%) = FALSE) THEN
1				NODE_DISTANCE! = C_N_DIST!
1				NEXT_NODE% = N%
1			ENDIF
1		NEXT N%

1		IF IS_FIRST_ITERATION? = TRUE THEN
			; Move onto the closest node to be "on track"
			LP moveAbsolute(#NODE_X_COORDINATES!(NEXT_NODE%), #NODE_Y_COORDINATES!(NEXT_NODE%), SPEED!)
			LP waitForSeconds(0.2)
1		ENDIF

		; Check if found node is actually closer to target or not, exclude the node in any case
1		#NODE_IS_EXCLUDED?(NEXT_NODE%) = TRUE
1		C_T_DIST! = SQRT(EXP(2, TARG_X_COORDINATE! - CURR_X_COORDINATE!) + EXP(2, TARG_Y_COORDINATE! - CURR_Y_COORDINATE!))
1		N_T_DIST! = SQRT(EXP(2, TARG_X_COORDINATE! - #NODE_X_COORDINATES!(NEXT_NODE%)) + EXP(2, TARG_Y_COORDINATE! - #NODE_Y_COORDINATES!(NEXT_NODE%)))
1		IF N_T_DIST! < C_T_DIST! THEN
			; Closer to target, move to the node
			LP moveAbsolute(#NODE_X_COORDINATES!(NEXT_NODE%), #NODE_Y_COORDINATES!(NEXT_NODE%), SPEED!)
			LP waitForSeconds(0.2)
1		ENDIF
1		IS_FIRST_ITERATION? = FALSE
1	END

	; Navigation finished, reset global excluded nodes variable
1 	FOR I% = 1 TO #NODE_NUMBER%
1		#NODE_IS_EXCLUDED?(I%) = FALSE
1 	NEXT I%
PEND

LPS stabilize
;Rectangular construct with chainmail pattern for constant speed
;Parameters: P1-hight(layers), P2 - circle radius, P3 - Size in X-direction
;P4 - size in Y-direction, P5 - circle spacing, P6 - linear speed
;!!!!! diagonal entering movement cancelled

1 H=P1
1 CRAD=P2
1 XSIZE=P3
1 YSIZE=P4
1 CSPC=P5
1 FEEDL=P6

1 NCX%=INT(XSIZE/CSPC)
1 NDCY%=INT(YSIZE/(2*CSPC))

G91	
G1 	X0	Y[-CSPC*(NDCY%-1)+CRAD]		F[FEEDL]
G3 	X[CRAD]	Y[-CRAD]	R[CRAD]	F[FEEDL]

1 FOR I%=1 TO H
1	FOR J%=1 TO NDCY%
1		FOR K%=1 TO (NCX%-1)
			G2 X0		Y0	I0 J[-CRAD]	F[FEEDL]
			G1 X[CSPC]	Y0	F[FEEDL]	
1		NEXT K%	
		G2 X0		Y0		I0 J[-CRAD]	F[FEEDL]
		G2 X[CRAD]	Y[-CRAD]	R[CRAD]	F[FEEDL]
		G1 X0		Y[-CSPC*(1+2*(J%-1))]			F[FEEDL]
		G2 X[-CRAD]	Y[-CRAD]	R[CRAD]	F[FEEDL]
1		FOR K%=1 TO (NCX%-1)
			G2 X0		Y0	I0 J[CRAD]	F[FEEDL]
			G1 X[-CSPC]	Y0	F[FEEDL]	
1		NEXT K%
		G2 X0		Y0	I0 J[CRAD]	F[FEEDL]
		G2 X[-CRAD]	Y[CRAD]	R[CRAD]	F[FEEDL]
1		IF J%<NDCY%	THEN
			G1	X0	Y[CSPC*2*J%]
			G2 X[CRAD]	Y[CRAD]	R[CRAD]	F[FEEDL]
1		ELSE
			G1	X0	Y[CSPC*J%]
1			IF I%<H THEN
				G2	X[CRAD]	Y[CRAD]	R[CRAD]	F[FEEDL]
1			ELSE
				G1 X0	Y[CSPC*(J%-1)]		F[FEEDL]
				G3	X[-CRAD]	Y[CRAD]	R[CRAD]	F[FEEDL]
1			ENDIF	
1		ENDIF
1 	NEXT J%
1 NEXT I%
PEND

; >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SUBROUTINES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<