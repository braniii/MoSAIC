URLS=[
"mosaic/index.html",
"mosaic/clustering.html",
"mosaic/umap_similarity.html",
"mosaic/utils.html",
"mosaic/similarity.html"
];
INDEX=[
{
"ref":"mosaic",
"url":0,
"doc":"                                              Docs \u2022  Features \u2022  Installation \u2022  Usage \u2022  FAQ    Molecular Systems Automated Identification of Cooperativity MoSAIC is a new method for correlation analysis which automatically detects collective motion in MD simulation data, identifies uncorrelated features as noise and hence provides a detailed picture of the key coordinates driving a conformational change in a biomolecular system. It is based on the Leiden community detection algorithm which is used to bring a correlation matrix in a block-diagonal form. The method was published in: > G. Diez, D. Nagel, and G. Stock, >  Correlation-based feature selection to identify functional dynamcis > in proteins , > [arXiv:2204.02770](https: arxiv.org/abs/2204.02770) We kindly ask you to cite this article in case you use this software package for published works.  Features - Intuitive usage via [module]( module -inside-a-python-script) and via [CI]( ci -usage-directly-from-the-command-line) - Sklearn-style API for fast integration into your Python workflow - No magic, only a single parameter - Extensive [documentation](https: moldyn.github.io/feature_selection) and detailed discussion in publication  Installation The package is called  mosaic-clustering and is available via [PyPI](https: pypi.org/project/mosaic-clustering) or [conda](https: anaconda.org/conda-forge/mosaic-clustering). To install it, simply call:   python3 -m pip install  upgrade mosaic-clustering   or   conda install -c conda-forge mosaic-clustering   or for the latest dev version    via ssh key python3 -m pip install git+ssh: git@github.com/moldyn/MoSAIC.git  or via password-based login python3 -m pip install git+https: github.com/moldyn/MoSAIC.git   In case one wants to use the deprecated  UMAPSimilarity or the module  mosaic umap one needs to specify the  extras_require='umap' , so   python3 -m pip install  upgrade moldyn-mosaic[umap]    Shell Completion Using the  bash ,  zsh or  fish shell click provides an easy way to provide shell completion, checkout the [docs](https: click.palletsprojects.com/en/8.0.x/shell-completion). In the case of bash you need to add following line to your  ~/.bashrc   eval \"$(_MOSAIC_COMPLETE=bash_source mosaic)\"    Usage In general one can call the module directly by its entry point  $ MoSAIC or by calling the module  $ python -m mosaic . The latter method is preferred to ensure using the desired python environment. For enabling the shell completion, the entry point needs to be used.  CI - Usage Directly from the Command Line The module brings a rich CI using [click](https: click.palletsprojects.com). Each module and submodule contains a detailed help, which can be accessed by   $ python -m mosaic Usage: python -m mosaic [OPTIONS] COMMAND [ARGS] . MoSAIC motion v0.2.1 Molecular systems automated identification of collective motion, is a correlation based feature selection framework for MD data. Copyright (c) 2021-2022, Georg Diez and Daniel Nagel Options:  help Show this message and exit. Commands: clustering Clustering similarity matrix of coordinates. similarity Creating similarity matrix of coordinates. umap Embedd similarity matrix with UMAP.   For more details on the submodule one needs to specify one of the three commands. A simple workflow example for clustering the input file  input_file using correlation and Leiden with CPM and the default resolution parameter:    creating correlation matrix $ python -m mosaic similarity -i input_file -o output_similarity -metric correlation -v MoSAIC SIMILARITY  ~ Initialize similarity class  ~ Load file input_file  ~ Fit input  ~ Store similarity matrix in output_similarity  clustering with CPM and default resolution parameter  the latter needs to be fine-tuned to each matrix $ python -m mosaic clustering -i output_similarity -o output_clustering  plot -v MoSAIC CLUSTERING  ~ Initialize clustering class  ~ Load file output_similarity  ~ Fit input  ~ Store output  ~ Plot matrix   This will generate the similarity matrix stored in  output_similarity , the plotted result in  output_clustering.matrix.pdf , the raw data of the matrix in  output_clustering.matrix and a file containing in each row the indices of a cluster.  Module - Inside a Python Script   import mosaic  Load file  X is np.ndarray of shape (n_samples, n_features) sim = mosaic.Similarity( metric='correlation',  or 'NMI', 'GY', 'JSD' ) sim.fit(X)  Cluster matrix clust = mosaic.Clustering( mode='CPM',  or 'modularity ) clust.fit(sim.matrix_) clusters = clust.clusters_ clusterd_X = clust.matrix_  .    FAQ  How to load the clusters file back to Python? Simply use the function provided in  tools :   import mosaic clusterfile = ' .' clusters = mosaic.tools.load_clusters(clusterfile)    I get an error. Please open an issue.  Should I upgrade the package? You can check out the CHANGELOG.md to see what changed.  How can I interpretate the results? Check out our publication for two detailed examples.  Is it possible to install the CLI only? Partially, yes. If you do not want to screw up your current Python environment there are multiples possibilities. Either create a virtual environment on your own via  conda or  venv , or you can simply use [pipx](https: pypa.github.io/pipx/)  Is the silhouette method implemented? This feature will be added in  v0.3.0 in the next weeks."
},
{
"ref":"mosaic.Clustering",
"url":0,
"doc":"Class for clustering a correlation matrix. Parameters      mode : str, default='CPM' the mode which determines the quality function optimized by the Leiden algorithm ('CPM', or 'modularity') or linkage clustering. - 'CPM': will use the constant Potts model on the full, weighted graph - 'modularity': will use modularity on a knn-graph - 'linkage': will use complete-linkage clustering - 'kmedoids': will use $k$-medoids clustering weighted : bool, default=True, If True, the underlying graph has weighted edges. Otherwise, the graph is constructed using the adjacency matrix. n_neighbors : int, default=None, This parameter specifies if the whole matrix is used, or an knn-graph. The default depends on the  mode - 'CPM':  None uses full graph, and - 'modularity':  None uses square root of the number of features. resolution_parameter : float, default=None, Required for mode 'CPM' and 'linkage'. If None, the resolution parameter will be set to the third quartile of  X for  n_neighbors=None and else to the mean value of the knn graph. n_clusters : int, default=None, Required for 'kmedoids'. The number of clusters to form. seed : int, default=None, Use an integer to make the randomness of Leidenalg deterministic. By default uses a random seed if nothing is specified. Attributes      clusters_ : ndarray of shape (n_clusters, ) The result of the clustering process. A list of arrays, each containing all indices (features) for each cluster. labels_ : ndarray of shape (n_features, ) Labels of each feature. matrix_ : ndarray of shape (n_features, n_features) Permuted matrix according to the found clusters. ticks_ : ndarray of shape (n_clusters, ) Get cumulative indices where new cluster starts in  matrix_ . permutation_ : ndarray of shape (n_features, ) Permutation of the input features (corresponds to flattened  clusters_ ). n_neighbors_ : int Only avaiable when using knn graph. Indicates the number of nearest neighbors used for constructin the knn-graph. resolution_param_ : float Only for mode 'CPM' and 'linkage'. Indicates the resolution parameter used for the CPM based Leiden clustering. linkage_matrix_ : ndarray of shape (n_clusters - 1, 4) Only for mode 'linkage'. Holds hierarchicak clustering encoded as a linkage matrix, see [scipy:spatial.distance.linkage](https: docs.scipy.org/doc/scipy/reference/generated/scipy.cluster.hierarchy.linkage.html). Examples     >>> import mosaic >>> mat = np.array( 1.0, 0.1, 0.9], [0.1, 1.0, 0.1], [0.9, 0.1, 1.0 ) >>> clust = mosaic.Clustering() >>> clust.fit(mat) >>> clust.matrix_ array( 1. , 0.9, 0.1], [0.9, 1. , 0.1], [0.1, 0.1, 1.  ) >>> clust.clusters_ array([list([2, 0]), list([1])], dtype=object) Initialize Clustering class."
},
{
"ref":"mosaic.Clustering.fit",
"url":0,
"doc":"Clusters the correlation matrix by Leiden clustering on a graph. Parameters      X : ndarray of shape (n_features, n_features) Matrix containing the correlation metric which is clustered. The values should go from [0, 1] where 1 means completely correlated and 0 no correlation. y : Ignored Not used, present for scikit API consistency by convention.",
"func":1
},
{
"ref":"mosaic.Similarity",
"url":0,
"doc":"Class for calculating the similarity measure. Parameters      metric : str, default='correlation' the correlation metric to use for the feature distance matrix. -  'correlation' will use the absolute value of the Pearson correlation -  'NMI' will use the mutual information normalized by joined entropy -  'GY' uses Gel'fand and Yaglom normalization[^1] -  'JSD' will use the Jensen-Shannon divergence between the joint probability distribution and the product of the marginal probability distributions to calculate their dissimilarity Note:  'NMI' is supported only with online=False online : bool, default=False If True, the input of fit X needs to be a file name and the correlation is calculated on the fly. Otherwise, an array is assumed as input X. normalize_method : str, default='geometric' Only required for metric  'NMI' . Determines the normalization factor for the mutual information: -  'joint' is the joint entropy -  'max' is the maximum of the individual entropies -  'arithmetic' is the mean of the individual entropies -  'geometric' is the square root of the product of the individual entropies -  'min' is the minimum of the individual entropies knn_estimator : bool, default=False Can only be set for metric GY. If True, the mutual information is estimated reliably by a parameter free method based on entropy estimation from k-nearest neighbors distances[^3]. It considerably increases the computational time and is thus only advisable for relatively small data-sets. Attributes      matrix_ : ndarray of shape (n_features, n_features) The correlation-measure-based pairwise distance matrix of the data. It scales from [0, 1]. Examples     >>> import mosaic >>> x = np.linspace(0, np.pi, 1000) >>> data = np.array([np.cos(x), np.cos(x + np.pi / 6)]).T >>> sim = mosaic.Similarity() >>> sim.fit(data) >>> sim.matrix_ array( 1. , 0.9697832], [0.9697832, 1.  ) Notes   - The correlation is defined as  \\rho_{X,Y} = \\frac{\\langle(X -\\mu_X)(Y -\\mu_Y)\\rangle}{\\sigma_X\\sigma_Y} where for the online algorithm the Welford algorithm taken from Donald E. Knuth were used [^2]. [^1]: Gel'fand, I.M. and Yaglom, A.M. (1957). \"Calculation of amount of information about a random function contained in another such function\". American Mathematical Society Translations, series 2, 12, pp. 199\u2013246. [^2]: Welford algorithm, generalized to correlation. Taken from: Donald E. Knuth (1998). \"The Art of Computer Programming\", volume 2: Seminumerical Algorithms, 3rd edn., p. 232. Boston: Addison-Wesley. [^3]: B.C. Ross, PLoS ONE 9(2) (2014), \"Mutual Information between Discrete and Continuous Data Sets\" The Jensen-Shannon divergence is defined as  D_{\\text{JS = \\frac{1}{2} D_{\\text{KL (p(x,y) M) + \\frac{1}{2} D_{\\text{KL (p(x)p(y) M)\\;, where \\(M = \\frac{1}{2} [p(x,y) + p(x)p(y)]\\) is an averaged probability distribution and \\(D_{\\text{KL \\) denotes the Kullback-Leibler divergence. Initialize Similarity class."
},
{
"ref":"mosaic.Similarity.fit",
"url":0,
"doc":"Compute the correlation/nmi distance matrix. Parameters      X : ndarray of shape (n_samples, n_features) or str if online=True Training data. y : Ignored Not used, present for scikit API consistency by convention.",
"func":1
},
{
"ref":"mosaic.UMAPSimilarity",
"url":0,
"doc":"Class for embedding similarity matrix with UMAP. For more details on the parameters check the UMAP documentation. Parameters      densmap : bool, default=True If True the density-augmented objective of densMAP is used for optimization. There the local densities are encouraged to be correlated with those in the original space. n_neighbors: int, default=None Size of nearest neighbors used for manifold estimation in UMAP. If  None uses square root of the number of features. n_components: int, default=2 Dimensionality of the local embedding. Attributes      matrix_ : ndarray of shape (n_features, n_features) Normalized pairwise distance matrix of the UMAP embedding. embedding_ : ndarray of shape (n_features, n_components) Coordinates of features in UMAP embedding. n_neighbors_ : int Number of used neighbors. Initialize UMAPSimilarity class."
},
{
"ref":"mosaic.UMAPSimilarity.fit",
"url":0,
"doc":"Fit similarity matrix into UMAP embedding.",
"func":1
},
{
"ref":"mosaic.clustering",
"url":1,
"doc":"Class for clustering the correlation matrices. MIT License Copyright (c) 2021-2022, Daniel Nagel, Georg Diez All rights reserved."
},
{
"ref":"mosaic.clustering.Clustering",
"url":1,
"doc":"Class for clustering a correlation matrix. Parameters      mode : str, default='CPM' the mode which determines the quality function optimized by the Leiden algorithm ('CPM', or 'modularity') or linkage clustering. - 'CPM': will use the constant Potts model on the full, weighted graph - 'modularity': will use modularity on a knn-graph - 'linkage': will use complete-linkage clustering - 'kmedoids': will use $k$-medoids clustering weighted : bool, default=True, If True, the underlying graph has weighted edges. Otherwise, the graph is constructed using the adjacency matrix. n_neighbors : int, default=None, This parameter specifies if the whole matrix is used, or an knn-graph. The default depends on the  mode - 'CPM':  None uses full graph, and - 'modularity':  None uses square root of the number of features. resolution_parameter : float, default=None, Required for mode 'CPM' and 'linkage'. If None, the resolution parameter will be set to the third quartile of  X for  n_neighbors=None and else to the mean value of the knn graph. n_clusters : int, default=None, Required for 'kmedoids'. The number of clusters to form. seed : int, default=None, Use an integer to make the randomness of Leidenalg deterministic. By default uses a random seed if nothing is specified. Attributes      clusters_ : ndarray of shape (n_clusters, ) The result of the clustering process. A list of arrays, each containing all indices (features) for each cluster. labels_ : ndarray of shape (n_features, ) Labels of each feature. matrix_ : ndarray of shape (n_features, n_features) Permuted matrix according to the found clusters. ticks_ : ndarray of shape (n_clusters, ) Get cumulative indices where new cluster starts in  matrix_ . permutation_ : ndarray of shape (n_features, ) Permutation of the input features (corresponds to flattened  clusters_ ). n_neighbors_ : int Only avaiable when using knn graph. Indicates the number of nearest neighbors used for constructin the knn-graph. resolution_param_ : float Only for mode 'CPM' and 'linkage'. Indicates the resolution parameter used for the CPM based Leiden clustering. linkage_matrix_ : ndarray of shape (n_clusters - 1, 4) Only for mode 'linkage'. Holds hierarchicak clustering encoded as a linkage matrix, see [scipy:spatial.distance.linkage](https: docs.scipy.org/doc/scipy/reference/generated/scipy.cluster.hierarchy.linkage.html). Examples     >>> import mosaic >>> mat = np.array( 1.0, 0.1, 0.9], [0.1, 1.0, 0.1], [0.9, 0.1, 1.0 ) >>> clust = mosaic.Clustering() >>> clust.fit(mat) >>> clust.matrix_ array( 1. , 0.9, 0.1], [0.9, 1. , 0.1], [0.1, 0.1, 1.  ) >>> clust.clusters_ array([list([2, 0]), list([1])], dtype=object) Initialize Clustering class."
},
{
"ref":"mosaic.clustering.Clustering.fit",
"url":1,
"doc":"Clusters the correlation matrix by Leiden clustering on a graph. Parameters      X : ndarray of shape (n_features, n_features) Matrix containing the correlation metric which is clustered. The values should go from [0, 1] where 1 means completely correlated and 0 no correlation. y : Ignored Not used, present for scikit API consistency by convention.",
"func":1
},
{
"ref":"mosaic.umap_similarity",
"url":2,
"doc":"Class for embedding correlation matrix with UMAP. MIT License Copyright (c) 2021-2022, Daniel Nagel, Georg Diez All rights reserved."
},
{
"ref":"mosaic.umap_similarity.UMAPSimilarity",
"url":2,
"doc":"Class for embedding similarity matrix with UMAP. For more details on the parameters check the UMAP documentation. Parameters      densmap : bool, default=True If True the density-augmented objective of densMAP is used for optimization. There the local densities are encouraged to be correlated with those in the original space. n_neighbors: int, default=None Size of nearest neighbors used for manifold estimation in UMAP. If  None uses square root of the number of features. n_components: int, default=2 Dimensionality of the local embedding. Attributes      matrix_ : ndarray of shape (n_features, n_features) Normalized pairwise distance matrix of the UMAP embedding. embedding_ : ndarray of shape (n_features, n_components) Coordinates of features in UMAP embedding. n_neighbors_ : int Number of used neighbors. Initialize UMAPSimilarity class."
},
{
"ref":"mosaic.umap_similarity.UMAPSimilarity.fit",
"url":2,
"doc":"Fit similarity matrix into UMAP embedding.",
"func":1
},
{
"ref":"mosaic.utils",
"url":3,
"doc":"Class with helper functions. MIT License Copyright (c) 2021-2022, Daniel Nagel All rights reserved."
},
{
"ref":"mosaic.utils.load_clusters",
"url":3,
"doc":"Load clusters stored from cli. Parameters      filename : str Filename of cluster file. Returns    - clusters : ndarray of shape (n_clusters, ) A list of arrays, each containing all indices (features) for each cluster.",
"func":1
},
{
"ref":"mosaic.utils.save_clusters",
"url":3,
"doc":"Save clusters from  mosaic.Clustering.clusters_ to txt file. Parameters      filename : str Filename of cluster file. clusters : ndarray of shape (n_clusters, ) A list of arrays, each containing all indices (features) for each cluster.",
"func":1
},
{
"ref":"mosaic.similarity",
"url":4,
"doc":"Class for estimating correlation matrices. MIT License Copyright (c) 2021-2022, Daniel Nagel, Georg Diez All rights reserved."
},
{
"ref":"mosaic.similarity.Similarity",
"url":4,
"doc":"Class for calculating the similarity measure. Parameters      metric : str, default='correlation' the correlation metric to use for the feature distance matrix. -  'correlation' will use the absolute value of the Pearson correlation -  'NMI' will use the mutual information normalized by joined entropy -  'GY' uses Gel'fand and Yaglom normalization[^1] -  'JSD' will use the Jensen-Shannon divergence between the joint probability distribution and the product of the marginal probability distributions to calculate their dissimilarity Note:  'NMI' is supported only with online=False online : bool, default=False If True, the input of fit X needs to be a file name and the correlation is calculated on the fly. Otherwise, an array is assumed as input X. normalize_method : str, default='geometric' Only required for metric  'NMI' . Determines the normalization factor for the mutual information: -  'joint' is the joint entropy -  'max' is the maximum of the individual entropies -  'arithmetic' is the mean of the individual entropies -  'geometric' is the square root of the product of the individual entropies -  'min' is the minimum of the individual entropies knn_estimator : bool, default=False Can only be set for metric GY. If True, the mutual information is estimated reliably by a parameter free method based on entropy estimation from k-nearest neighbors distances[^3]. It considerably increases the computational time and is thus only advisable for relatively small data-sets. Attributes      matrix_ : ndarray of shape (n_features, n_features) The correlation-measure-based pairwise distance matrix of the data. It scales from [0, 1]. Examples     >>> import mosaic >>> x = np.linspace(0, np.pi, 1000) >>> data = np.array([np.cos(x), np.cos(x + np.pi / 6)]).T >>> sim = mosaic.Similarity() >>> sim.fit(data) >>> sim.matrix_ array( 1. , 0.9697832], [0.9697832, 1.  ) Notes   - The correlation is defined as  \\rho_{X,Y} = \\frac{\\langle(X -\\mu_X)(Y -\\mu_Y)\\rangle}{\\sigma_X\\sigma_Y} where for the online algorithm the Welford algorithm taken from Donald E. Knuth were used [^2]. [^1]: Gel'fand, I.M. and Yaglom, A.M. (1957). \"Calculation of amount of information about a random function contained in another such function\". American Mathematical Society Translations, series 2, 12, pp. 199\u2013246. [^2]: Welford algorithm, generalized to correlation. Taken from: Donald E. Knuth (1998). \"The Art of Computer Programming\", volume 2: Seminumerical Algorithms, 3rd edn., p. 232. Boston: Addison-Wesley. [^3]: B.C. Ross, PLoS ONE 9(2) (2014), \"Mutual Information between Discrete and Continuous Data Sets\" The Jensen-Shannon divergence is defined as  D_{\\text{JS = \\frac{1}{2} D_{\\text{KL (p(x,y) M) + \\frac{1}{2} D_{\\text{KL (p(x)p(y) M)\\;, where \\(M = \\frac{1}{2} [p(x,y) + p(x)p(y)]\\) is an averaged probability distribution and \\(D_{\\text{KL \\) denotes the Kullback-Leibler divergence. Initialize Similarity class."
},
{
"ref":"mosaic.similarity.Similarity.fit",
"url":4,
"doc":"Compute the correlation/nmi distance matrix. Parameters      X : ndarray of shape (n_samples, n_features) or str if online=True Training data. y : Ignored Not used, present for scikit API consistency by convention.",
"func":1
}
]