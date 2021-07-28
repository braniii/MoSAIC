# -*- coding: utf-8 -*-
"""Class for clustering the correlation matrices.

MIT License
Copyright (c) 2021, Daniel Nagel, Georg Diez
All rights reserved.

"""
import numpy as np
import igraph as ig
import leidenalg as la


class Clustering:
    """Class for clustering a correlation matrix.

    Parameters
    ----------
    mode : str, default='CPM'
        the mode which determines the quality function optimized by the Leiden
        algorithm.

        - 'CPM' will use the constant Potts model on the full, weighted graph
        - 'modularity' will use modularity on a knn-graph

    weighted : bool, default=True,
        If True, the underlying graph has weighted edges. Otherwise, the graph
        is constructed using the adjacency matrix.

    neighbors: int, default=None,
        If NaN, the number of neighbors is chosen as the square root of the
        number of features.
    """

    def __init__(self, *, mode='CPM', weighted=True, neighbors=None):
        """Class for clustering a correlation matrix.

        Parameters
        ----------
        matrix : ndarray of shape(n_features, n_features)
            The linear/nonlinear correlation matrix which will be clustered.
        """
        self._mode = mode
        self._weighted = weighted
        self._neighbors = neighbors

        if self._mode == 'CPM' and not self._weighted:
            raise ValueError(
                'CPM Leiden clustering works best on a fully weighted graph.'
            )


    def

